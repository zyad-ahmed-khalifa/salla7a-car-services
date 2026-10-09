import type { Product } from './spare-part.model'
import type { Order } from './order.model'
import type { Emergency } from './emergency.model'
import type { User } from './user.model'
import type { Technician } from './technician.model'
import type { Vehicle } from './vehicle.model'

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    ownerId: 'c1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    licensePlate: 'ABC-1234',
    color: 'Silver',
    vin: '4T1BF1FK5EU123456'
  },
  {
    id: 'v2',
    ownerId: 'c1',
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    licensePlate: 'XYZ-5678',
    color: 'White',
    vin: '2HGFC2F59KH123456'
  },
  {
    id: 'v3',
    ownerId: 'c2',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    licensePlate: 'DEF-9012',
    color: 'Black',
    vin: '1FTFW1ET6MFA12345'
  },
  {
    id: 'v4',
    ownerId: 'c2',
    make: 'Nissan',
    model: 'Altima',
    year: 2018,
    licensePlate: 'GHI-3456',
    color: 'Blue'
  },
  {
    id: 'v5',
    ownerId: 'c3',
    make: 'Hyundai',
    model: 'Sonata',
    year: 2022,
    licensePlate: 'JKL-7890',
    color: 'Red'
  },
  {
    id: 'v6',
    ownerId: 'c4',
    make: 'Kia',
    model: 'Sportage',
    year: 2020,
    licensePlate: 'MNO-2345',
    color: 'Gray'
  }
]

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Bosch Front Brake Pads Set',
    brand: 'Bosch',
    category: 'Brakes',
    type: 'Original',
    price: 89.99,
    stock: 24,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
    compatibleCars: [
      'Toyota Camry 2018-2023',
      'Toyota Corolla 2019-2023',
      'Toyota Avalon 2019-2022'
    ],
    description:
      'Premium ceramic brake pads providing superior stopping power with minimal dust and noise. Direct OEM replacement for listed vehicles.',
    rating: 4.8,
    reviewCount: 142
  },
  {
    id: 'p2',
    name: 'Denso Oxygen Sensor',
    brand: 'Denso',
    category: 'Engine',
    type: 'OEM',
    price: 65.5,
    stock: 8,
    image:
      'https://images.unsplash.com/photo-1596722430832-19f5cd7c46fb?w=600&h=400&fit=crop&auto=format',
    compatibleCars: ['Honda Civic 2016-2021', 'Honda Accord 2016-2022', 'Honda CR-V 2017-2022'],
    description:
      'OEM-quality oxygen sensor for precise fuel management and optimal engine performance. Easy plug-and-play installation.',
    rating: 4.6,
    reviewCount: 87
  },
  {
    id: 'p3',
    name: 'Monroe Shock Absorber Rear Pair',
    brand: 'Monroe',
    category: 'Suspension',
    type: 'OEM',
    price: 145.0,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1621193793262-4127d9855c91?w=600&h=400&fit=crop&auto=format',
    compatibleCars: ['Ford F-150 2015-2021', 'Ford F-250 2017-2022'],
    description:
      'Heavy-duty rear shock absorbers designed for trucks. Provides excellent load handling and smooth ride quality on all terrains.',
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: 'p4',
    name: 'AC Delco Battery 78-6YR',
    brand: 'AC Delco',
    category: 'Electrical',
    type: 'Original',
    price: 129.99,
    stock: 6,
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop&auto=format',
    compatibleCars: [
      'Chevrolet Silverado 2018-2023',
      'GMC Sierra 2018-2023',
      'Cadillac Escalade 2019-2023'
    ],
    description:
      '730 CCA AGM battery for demanding applications. Maintenance-free with spill-proof design and 6-year warranty.',
    rating: 4.9,
    reviewCount: 318
  },
  {
    id: 'p5',
    name: 'K&N High-Flow Air Filter',
    brand: 'K&N',
    category: 'Filters',
    type: 'Aftermarket',
    price: 52.0,
    stock: 31,
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop&auto=format',
    compatibleCars: [
      'Nissan Altima 2016-2023',
      'Nissan Maxima 2016-2023',
      'Infiniti Q50 2016-2023'
    ],
    description:
      'Washable and reusable high-flow air filter that increases horsepower and acceleration. Lasts the lifetime of your vehicle.',
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: 'p6',
    name: 'NGK Iridium Spark Plug Set (4)',
    brand: 'NGK',
    category: 'Engine',
    type: 'Original',
    price: 48.0,
    stock: 45,
    image:
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&auto=format',
    compatibleCars: [
      'Hyundai Sonata 2018-2023',
      'Kia Optima 2018-2023',
      'Hyundai Elantra 2019-2023'
    ],
    description:
      'Set of 4 iridium spark plugs for improved fuel economy and reliable ignition. 100,000 mile replacement interval.',
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'p7',
    name: 'Moog Front Wheel Hub Assembly',
    brand: 'Moog',
    category: 'Suspension',
    type: 'OEM',
    price: 98.5,
    stock: 0,
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&auto=format',
    compatibleCars: ['Kia Sportage 2017-2022', 'Hyundai Tucson 2016-2021'],
    description:
      'Complete wheel hub assembly with integrated ABS sensor. Pre-greased sealed bearing for long-lasting performance.',
    rating: 4.6,
    reviewCount: 64
  },
  {
    id: 'p8',
    name: 'Mobil 1 Synthetic Engine Oil 5W-30 (5L)',
    brand: 'Mobil 1',
    category: 'Fluids',
    type: 'Aftermarket',
    price: 34.99,
    stock: 87,
    image:
      'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=600&h=400&fit=crop&auto=format',
    compatibleCars: ['Universal - Check owner manual for compatibility'],
    description:
      'Full synthetic 5W-30 motor oil providing exceptional wear protection, outstanding high and low temperature performance.',
    rating: 4.9,
    reviewCount: 542
  }
]

export const customers: User[] = [
  {
    id: 'c1',
    name: 'Ahmed Al-Rashidi',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    role: 'customer',
    status: 'Active',
    address: 'Riyadh, Al-Olaya District',
    createdAt: '2024-01-15'
  },
  {
    id: 'c2',
    name: 'Sara Al-Mutairi',
    email: 'sara@example.com',
    phone: '+966 55 234 5678',
    role: 'customer',
    status: 'Active',
    address: 'Jeddah, Al-Salamah District',
    createdAt: '2024-02-20'
  },
  {
    id: 'c3',
    name: 'Khalid Al-Qahtani',
    email: 'khalid@example.com',
    phone: '+966 54 345 6789',
    role: 'customer',
    status: 'Inactive',
    address: 'Dammam, Al-Faisaliyah',
    createdAt: '2024-03-10'
  },
  {
    id: 'c4',
    name: 'Fatima Al-Harbi',
    email: 'fatima@example.com',
    phone: '+966 59 456 7890',
    role: 'customer',
    status: 'Active',
    address: 'Riyadh, Al-Nakheel District',
    createdAt: '2024-04-05'
  }
]

export const technicians: Technician[] = [
  {
    id: 't1',
    name: 'Mohammed Al-Otaibi',
    email: 'moh.tech@salla7a.com',
    phone: '+966 50 987 6543',
    role: 'technician',
    status: 'Active',
    address: 'Riyadh, Olaya',
    createdAt: '2023-06-01',
    specialization: ['Engine Repair', 'Electrical', 'General Maintenance'],
    experienceYears: 8,
    rating: 4.8,
    completedServices: 312,
    serviceArea: 'Riyadh Central',
    availability: 'Available'
  },
  {
    id: 't2',
    name: 'Abdullah Al-Shehri',
    email: 'abd.tech@salla7a.com',
    phone: '+966 55 876 5432',
    role: 'technician',
    status: 'Active',
    address: 'Jeddah, Al-Zahra',
    createdAt: '2023-08-15',
    specialization: ['Tires', 'Brakes', 'Suspension'],
    experienceYears: 5,
    rating: 4.6,
    completedServices: 198,
    serviceArea: 'Jeddah North',
    availability: 'Busy'
  },
  {
    id: 't3',
    name: 'Faisal Al-Dosari',
    email: 'fai.tech@salla7a.com',
    phone: '+966 54 765 4321',
    role: 'technician',
    status: 'Active',
    address: 'Dammam, Al-Faisaliyah',
    createdAt: '2023-11-20',
    specialization: ['Battery', 'AC Systems', 'Fuel Systems'],
    experienceYears: 6,
    rating: 4.9,
    completedServices: 241,
    serviceArea: 'Dammam & Khobar',
    availability: 'Offline'
  }
]

export const adminUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@salla7a.com',
  phone: '+966 50 000 0000',
  role: 'admin',
  status: 'Active',
  createdAt: '2023-01-01'
}

export const orders: Order[] = [
  {
    id: 'ORD-2401',
    customerId: 'c1',
    customerName: 'Ahmed Al-Rashidi',
    items: [
      { product: products[0], quantity: 1, price: 89.99 },
      { product: products[5], quantity: 1, price: 48.0 }
    ],
    subtotal: 137.99,
    shipping: 15.0,
    total: 152.99,
    status: 'Delivered',
    date: '2024-11-05',
    address: 'Riyadh, Al-Olaya District',
    vehicle: 'Toyota Camry 2020'
  },
  {
    id: 'ORD-2402',
    customerId: 'c1',
    customerName: 'Ahmed Al-Rashidi',
    items: [{ product: products[3], quantity: 1, price: 129.99 }],
    subtotal: 129.99,
    shipping: 15.0,
    total: 144.99,
    status: 'Shipped',
    date: '2024-11-28',
    address: 'Riyadh, Al-Olaya District',
    vehicle: 'Honda Civic 2019'
  },
  {
    id: 'ORD-2403',
    customerId: 'c2',
    customerName: 'Sara Al-Mutairi',
    items: [
      { product: products[2], quantity: 1, price: 145.0 },
      { product: products[7], quantity: 2, price: 69.98 }
    ],
    subtotal: 214.98,
    shipping: 20.0,
    total: 234.98,
    status: 'Processing',
    date: '2024-12-01',
    address: 'Jeddah, Al-Salamah District',
    vehicle: 'Ford F-150 2021'
  },
  {
    id: 'ORD-2404',
    customerId: 'c4',
    customerName: 'Fatima Al-Harbi',
    items: [{ product: products[4], quantity: 1, price: 52.0 }],
    subtotal: 52.0,
    shipping: 10.0,
    total: 62.0,
    status: 'Pending',
    date: '2024-12-03',
    address: 'Riyadh, Al-Nakheel District',
    vehicle: 'Kia Sportage 2020'
  },
  {
    id: 'ORD-2405',
    customerId: 'c3',
    customerName: 'Khalid Al-Qahtani',
    items: [{ product: products[1], quantity: 2, price: 131.0 }],
    subtotal: 131.0,
    shipping: 15.0,
    total: 146.0,
    status: 'Cancelled',
    date: '2024-11-20',
    address: 'Dammam, Al-Faisaliyah',
    vehicle: 'Hyundai Sonata 2022'
  }
]

export const emergencies: Emergency[] = [
  {
    id: 'EMG-001',
    customerId: 'c1',
    customerName: 'Ahmed Al-Rashidi',
    customerPhone: '+966 50 123 4567',
    technicianId: 't1',
    technicianName: 'Mohammed Al-Otaibi',
    technicianPhone: '+966 50 987 6543',
    vehicle: vehicles[0],
    problemType: 'Dead Battery',
    description:
      "Car won't start, battery appears completely dead after leaving lights on overnight.",
    priority: 'High',
    location: {
  latitude: 26.4207,
  longitude: 50.0888,
  address: 'Dhahran–Khobar Rd, Dammam'
},
    coordinates: { lat: 24.6877, lng: 46.7219 },
    status: 'In Service',
    createdAt: '2024-12-03T10:15:00',
    updatedAt: '2024-12-03T11:30:00',
    statusHistory: [
      { status: 'Pending', time: '2024-12-03T10:15:00', note: 'Request submitted' },
      { status: 'Accepted', time: '2024-12-03T10:22:00', note: 'Technician accepted' },
      { status: 'On The Way', time: '2024-12-03T10:25:00', note: 'Technician en route' },
      { status: 'Arrived', time: '2024-12-03T10:55:00', note: 'Technician on site' },
      {
        status: 'In Service',
        time: '2024-12-03T11:05:00',
        note: 'Diagnosing and working on vehicle'
      }
    ]
  },
  {
    id: 'EMG-002',
    customerId: 'c2',
    customerName: 'Sara Al-Mutairi',
    customerPhone: '+966 55 234 5678',
    vehicle: vehicles[2],
    problemType: 'Flat Tire',
    description: 'Right front tire completely flat, no spare tire available.',
    priority: 'Medium',
    location: {
  latitude: 26.4207,
  longitude: 50.0888,
  address: 'Dhahran–Khobar Rd, Dammam'
},
    coordinates: { lat: 21.5433, lng: 39.1728 },
    status: 'Pending',
    createdAt: '2024-12-03T11:45:00',
    updatedAt: '2024-12-03T11:45:00',
    statusHistory: [{ status: 'Pending', time: '2024-12-03T11:45:00', note: 'Request submitted' }]
  },
  {
    id: 'EMG-003',
    customerId: 'c4',
    customerName: 'Fatima Al-Harbi',
    customerPhone: '+966 59 456 7890',
    technicianId: 't2',
    technicianName: 'Abdullah Al-Shehri',
    technicianPhone: '+966 55 876 5432',
    vehicle: vehicles[5],
    problemType: 'Engine Failure',
    description: 'Engine making loud knocking noise and losing power. Check engine light on.',
    priority: 'Critical',
    location: {
  latitude: 26.4207,
  longitude: 50.0888,
  address: 'Dhahran–Khobar Rd, Dammam'
},
    coordinates: { lat: 24.7552, lng: 46.6947 },
    status: 'Completed',
    createdAt: '2024-12-01T14:00:00',
    updatedAt: '2024-12-01T17:30:00',
    statusHistory: [
      { status: 'Pending', time: '2024-12-01T14:00:00' },
      { status: 'Accepted', time: '2024-12-01T14:10:00' },
      { status: 'On The Way', time: '2024-12-01T14:15:00' },
      { status: 'Arrived', time: '2024-12-01T14:45:00' },
      { status: 'In Service', time: '2024-12-01T14:55:00' },
      {
        status: 'Completed',
        time: '2024-12-01T17:30:00',
        note: 'Oil pump replaced, engine stabilized'
      }
    ]
  },
  {
    id: 'EMG-004',
    customerId: 'c3',
    customerName: 'Khalid Al-Qahtani',
    customerPhone: '+966 54 345 6789',
    vehicle: vehicles[4],
    problemType: 'Overheating',
    description: 'Temperature gauge in red zone, steam coming from hood.',
    priority: 'High',
    location: {
  latitude: 26.4207,
  longitude: 50.0888,
  address: 'Dhahran–Khobar Rd, Dammam'
},
    coordinates: { lat: 26.3927, lng: 49.9777 },
    status: 'Accepted',
    createdAt: '2024-12-03T12:30:00',
    updatedAt: '2024-12-03T12:38:00',
    statusHistory: [
      { status: 'Pending', time: '2024-12-03T12:30:00' },
      { status: 'Accepted', time: '2024-12-03T12:38:00' }
    ]
  }
]
