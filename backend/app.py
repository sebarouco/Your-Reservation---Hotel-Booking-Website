from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, date
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotel.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price_per_night = db.Column(db.Float, nullable=False)
    max_guests = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(200))
    amenities = db.Column(db.String(200))
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'price_per_night': self.price_per_night,
            'max_guests': self.max_guests,
            'image_url': self.image_url,
            'amenities': self.amenities.split(',') if self.amenities else []
        }

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(100), nullable=False)
    guest_email = db.Column(db.String(100), nullable=False)
    guest_phone = db.Column(db.String(20), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    num_guests = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='confirmed')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    room = db.relationship('Room', backref='reservations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'guest_name': self.guest_name,
            'guest_email': self.guest_email,
            'guest_phone': self.guest_phone,
            'room_id': self.room_id,
            'room': self.room.to_dict() if self.room else None,
            'check_in_date': self.check_in_date.isoformat(),
            'check_out_date': self.check_out_date.isoformat(),
            'num_guests': self.num_guests,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }

@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([room.to_dict() for room in rooms])

@app.route('/api/rooms/<int:room_id>', methods=['GET'])
def get_room(room_id):
    room = Room.query.get_or_404(room_id)
    return jsonify(room.to_dict())

@app.route('/api/availability', methods=['GET'])
def check_availability():
    check_in = request.args.get('check_in')
    check_out = request.args.get('check_out')
    num_guests = int(request.args.get('num_guests', 1))
    
    if not check_in or not check_out:
        return jsonify({'error': 'Check-in and check-out dates are required'}), 400
    
    try:
        check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
        check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    if check_in_date >= check_out_date:
        return jsonify({'error': 'Check-out date must be after check-in date'}), 400
    
    # Get rooms that can accommodate the number of guests
    available_rooms = Room.query.filter(Room.max_guests >= num_guests).all()
    
    # Filter out rooms that are already booked for the requested dates
    booked_room_ids = db.session.query(Reservation.room_id).filter(
        Reservation.status == 'confirmed',
        Reservation.check_in_date < check_out_date,
        Reservation.check_out_date > check_in_date
    ).distinct().all()
    
    booked_room_ids = [room_id[0] for room_id in booked_room_ids]
    
    final_available_rooms = [room for room in available_rooms if room.id not in booked_room_ids]
    
    return jsonify([room.to_dict() for room in final_available_rooms])

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['guest_name', 'guest_email', 'guest_phone', 'room_id', 
                      'check_in_date', 'check_out_date', 'num_guests']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    try:
        check_in_date = datetime.strptime(data['check_in_date'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(data['check_out_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    # Get room and validate capacity
    room = Room.query.get(data['room_id'])
    if not room:
        return jsonify({'error': 'Room not found'}), 404
    
    if data['num_guests'] > room.max_guests:
        return jsonify({'error': 'Room cannot accommodate the number of guests'}), 400
    
    # Check if room is available for the dates
    existing_reservation = Reservation.query.filter(
        Reservation.room_id == data['room_id'],
        Reservation.status == 'confirmed',
        Reservation.check_in_date < check_out_date,
        Reservation.check_out_date > check_in_date
    ).first()
    
    if existing_reservation:
        return jsonify({'error': 'Room is not available for the selected dates'}), 409
    
    # Calculate total price
    nights = (check_out_date - check_in_date).days
    total_price = nights * room.price_per_night
    
    # Create reservation
    reservation = Reservation(
        guest_name=data['guest_name'],
        guest_email=data['guest_email'],
        guest_phone=data['guest_phone'],
        room_id=data['room_id'],
        check_in_date=check_in_date,
        check_out_date=check_out_date,
        num_guests=data['num_guests'],
        total_price=total_price
    )
    
    db.session.add(reservation)
    db.session.commit()
    
    return jsonify(reservation.to_dict()), 201

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.order_by(Reservation.created_at.desc()).all()
    return jsonify([reservation.to_dict() for reservation in reservations])

@app.route('/api/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation(reservation_id):
    reservation = Reservation.query.get_or_404(reservation_id)
    return jsonify(reservation.to_dict())

def init_db():
    with app.app_context():
        db.create_all()
        
        # Add sample rooms if database is empty
        if Room.query.count() == 0:
            sample_rooms = [
                Room(
                    name='Deluxe Ocean View',
                    type='Deluxe',
                    description='Spacious room with stunning ocean views, king-size bed, and luxury amenities.',
                    price_per_night=250.0,
                    max_guests=2,
                    image_url='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    amenities='WiFi,Air Conditioning,Mini Bar,Balcony,Room Service'
                ),
                Room(
                    name='Standard Garden View',
                    type='Standard',
                    description='Comfortable room with garden views, perfect for budget-conscious travelers.',
                    price_per_night=120.0,
                    max_guests=2,
                    image_url='https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
                    amenities='WiFi,Air Conditioning,TV,Work Desk'
                ),
                Room(
                    name='Family Suite',
                    type='Suite',
                    description='Large suite with separate living area, perfect for families with children.',
                    price_per_night=350.0,
                    max_guests=4,
                    image_url='https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    amenities='WiFi,Air Conditioning,Kitchenette,Sofa Bed,Two Bedrooms'
                ),
                Room(
                    name='Single Room',
                    type='Standard',
                    description='Cozy single room with all essential amenities for solo travelers.',
                    price_per_night=80.0,
                    max_guests=1,
                    image_url='https://images.unsplash.com/photo-1590490362328-cd4f789f6fd8?w=800',
                    amenities='WiFi,Air Conditioning,TV,Work Desk'
                ),
                Room(
                    name='Honeymoon Suite',
                    type='Luxury',
                    description='Romantic suite with jacuzzi, champagne service, and panoramic views.',
                    price_per_night=450.0,
                    max_guests=2,
                    image_url='https://images.unsplash.com/photo-1590490362328-cd4f789f6fd8?w=800',
                    amenities='WiFi,Air Conditioning,Jacuzzi,Champagne Service,Balcony,Room Service'
                )
            ]
            
            for room in sample_rooms:
                db.session.add(room)
            
            db.session.commit()
            print("Sample rooms added to database!")

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
