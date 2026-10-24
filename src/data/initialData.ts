import { Product, Order, SecurityAuditLog } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-hamburguesa',
    name: 'Hamburguesa',
    tagline: 'Con papas crocantes y ensalada',
    description: 'Carne jugosa a la plancha con papas fritas artesanales, lechuga crocante, tomate y cremas peruanas.',
    category: 'burgers',
    price: 10.00,
    rating: 4.9,
    reviewCount: 184,
    badge: 'Top Ventas',
    badgeColor: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8o4J_EF_Bi-QIa6bys0yw4h5CYtcqMT_5pyhZyBYtl8KBfHAUD5Eer1uxHlJlkmlIijTlKTF1Znk--XWx6bgmlaH9TFNIlvekI8iLPi6Exn5ZxjRdp9DXcKd9q1NfiavFpKBrz7U-fT3EcYTnQpeUL8R0esUE0sqWZwFNgttfxWRwW4jICbF8523jxdaWbjkK76C5WuEsVrOTNFt44G7dQm9H2VgB4kQgfVQCY69ezjsLNXtIV4',
    inStock: true,
    availableAddons: [
      { id: 'sauce-mayo', name: 'Mayonesa artesanal', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-ketchup', name: 'Ketchup', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-mostaza', name: 'Mostaza clásica', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-ocopa', name: 'Ocopa arequipeña', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-aji', name: 'Ají pollero casero', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'extra-cheese', name: 'Queso cheddar fundido', price: 2.50, isIncludedByDefault: false },
      { id: 'extra-egg', name: 'Huevo frito a la inglesa', price: 2.00, isIncludedByDefault: false },
    ],
  },
  {
    id: 'prod-broaster-simple',
    name: 'Broaster',
    tagline: 'Con papas fritas y ensalada fresca',
    description: 'Pollo marinado al secreto pollero, frito a alta presión para un crocante inigualable y pulpa tierna.',
    category: 'broaster',
    price: 12.00,
    rating: 4.8,
    reviewCount: 220,
    badge: 'Crujiente',
    badgeColor: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJCg2ueAO6NhVkqr26PmR5gW3vxXeZ0Mk_M_t5DlDsJ7aVyLlcyapt12aAcUdBbC0WKuEDynnnO6bKatCnJuUsMl8uPfmmzYAVXEQ4j_1ojpO5pc65Qjdrxa1jv0prS9XpPjB6n6jAbHPb4kMYAFf3oTZHKPC6I-cxQyAo-AktSuJuSRq6zYUGnz542QpYV4esFnwQRP0ngK7waV6CT8HdtyQSMhmbiN3u63eFfcxh0UTy5D9Jc78',
    inStock: true,
    availableAddons: [
      { id: 'sauce-mayo', name: 'Mayonesa artesanal', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-ketchup', name: 'Ketchup', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-mostaza', name: 'Mostaza clásica', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-ocopa', name: 'Ocopa arequipeña', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-aji', name: 'Ají pollero casero', price: 0, isIncludedByDefault: true, isSauce: true },
    ],
  },
  {
    id: 'prod-broaster-arroz',
    name: 'Broaster + arroz',
    tagline: 'Con arroz, papas y ensalada',
    description: 'Broaster crujiente acompañado con arroz bien granado, papas nativas doradas y ensalada fresca con vinagreta.',
    category: 'broaster',
    price: 15.00,
    rating: 5.0,
    reviewCount: 142,
    badge: 'Completo',
    badgeColor: 'tertiary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlub503yPuo2fHJdVXMij22uzxOsYSaAnJAdjAQywZftMBiGMHdXJnD4Zx8mb43knC-AE2WeAaYL1hKKKV08cLbvXLbFrx2IEK8Z7gTE3nkWjbEABXoahlPU6SaDhFAA49B9QK5Hnn0FKePrZ8CLfpXCfqlzVWp4NgjwzOB3J9XHhvXV3ulMiOQUd9rJ3xvFNsMmVBA0xv4Ei9X45gG6cZTxq-S-Z9JgNEhO7YSy9cBym-1bkYjqY',
    allowsChaufaOption: true,
    inStock: true,
    availableAddons: [
      { id: 'arroz-blanco', name: 'Arroz blanco', price: 0, isIncludedByDefault: true },
      { id: 'sauce-mayo', name: 'Mayonesa artesanal', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-ketchup', name: 'Ketchup', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-mostaza', name: 'Mostaza clásica', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-ocopa', name: 'Ocopa arequipeña', price: 0, isIncludedByDefault: false, isSauce: true },
      { id: 'sauce-aji', name: 'Ají pollero casero', price: 0, isIncludedByDefault: true, isSauce: true },
    ],
  },
  {
    id: 'prod-alitas-bbq',
    name: 'Alitas BBQ x6',
    tagline: 'Bañadas en salsa BBQ dulce y picante',
    description: 'Alitas doradas glaseadas al wok en salsa barbacoa artesanal con toques ahumados, ajonjolí blanco y cebollita china.',
    category: 'combos',
    price: 16.50,
    rating: 4.7,
    reviewCount: 96,
    badge: 'Nuevo',
    badgeColor: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCojwzpTaAbE7JErtCbKyJu_mbTO0RQVDrgwO6nx7uHoHFSPftNdSQrpjUFnJCCAnzr67PJKER-vR8sC-BAknGKvnrAPTbz-FTOli9JPOQTDQIMLQj9pylhrn1XfddPuFDZJDaHCpibLMJkMETiB0EDCYK2L-1r0Me-jcIRuJrCfoL07jzCpoV_rvqWMfCVxqY6cVQmYReasw0SSLghYIPmiiW5DGGIpDbi526Wjp1pyizIC0BUZco',
    inStock: true,
    availableAddons: [
      { id: 'sauce-mayo', name: 'Mayonesa artesanal', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'sauce-aji', name: 'Ají pollero casero', price: 0, isIncludedByDefault: true, isSauce: true },
      { id: 'extra-fries', name: 'Papas fritas extra', price: 3.50, isIncludedByDefault: false },
    ],
  },
  {
    id: 'prod-inka-kola',
    name: 'Inka Kola 500ml',
    tagline: 'Helada / Al tiempo',
    description: 'La bebida de sabor nacional en presentación personal de 500ml.',
    category: 'combos',
    price: 5.00,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlub503yPuo2fHJdVXMij22uzxOsYSaAnJAdjAQywZftMBiGMHdXJnD4Zx8mb43knC-AE2WeAaYL1hKKKV08cLbvXLbFrx2IEK8Z7gTE3nkWjbEABXoahlPU6SaDhFAA49B9QK5Hnn0FKePrZ8CLfpXCfqlzVWp4NgjwzOB3J9XHhvXV3ulMiOQUd9rJ3xvFNsMmVBA0xv4Ei9X45gG6cZTxq-S-Z9JgNEhO7YSy9cBym-1bkYjqY',
    inStock: true,
    availableAddons: [],
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MYA-0004',
    createdAt: '19:42',
    timeAgo: 'Hace 3 min',
    clientName: 'Juan Pérez',
    clientPhone: '999 458 123',
    deliveryType: 'delivery',
    address: 'Av. Angélica Gamarra 1420 - Los Olivos',
    items: [
      {
        cartItemId: 'c1',
        productId: 'prod-hamburguesa',
        productName: 'Hamburguesa',
        basePrice: 10.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Mayonesa', 'Ketchup', 'Ají'],
        specialNotes: 'Papas bien doradas',
        itemTotal: 10.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8o4J_EF_Bi-QIa6bys0yw4h5CYtcqMT_5pyhZyBYtl8KBfHAUD5Eer1uxHlJlkmlIijTlKTF1Znk--XWx6bgmlaH9TFNIlvekI8iLPi6Exn5ZxjRdp9DXcKd9q1NfiavFpKBrz7U-fT3EcYTnQpeUL8R0esUE0sqWZwFNgttfxWRwW4jICbF8523jxdaWbjkK76C5WuEsVrOTNFt44G7dQm9H2VgB4kQgfVQCY69ezjsLNXtIV4',
      },
      {
        cartItemId: 'c2',
        productId: 'prod-broaster-arroz',
        productName: 'Broaster + arroz chaufa',
        basePrice: 15.00,
        quantity: 1,
        isChaufa: true,
        selectedSauces: ['Mayonesa', 'Ketchup', 'Ají'],
        specialNotes: 'Sin ensalada, cremas aparte',
        itemTotal: 17.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlub503yPuo2fHJdVXMij22uzxOsYSaAnJAdjAQywZftMBiGMHdXJnD4Zx8mb43knC-AE2WeAaYL1hKKKV08cLbvXLbFrx2IEK8Z7gTE3nkWjbEABXoahlPU6SaDhFAA49B9QK5Hnn0FKePrZ8CLfpXCfqlzVWp4NgjwzOB3J9XHhvXV3ulMiOQUd9rJ3xvFNsMmVBA0xv4Ei9X45gG6cZTxq-S-Z9JgNEhO7YSy9cBym-1bkYjqY',
      },
      {
        cartItemId: 'c3',
        productId: 'prod-broaster-simple',
        productName: 'Broaster clásico',
        basePrice: 12.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Ají pollero'],
        specialNotes: 'Presa pierna',
        itemTotal: 10.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJCg2ueAO6NhVkqr26PmR5gW3vxXeZ0Mk_M_t5DlDsJ7aVyLlcyapt12aAcUdBbC0WKuEDynnnO6bKatCnJuUsMl8uPfmmzYAVXEQ4j_1ojpO5pc65Qjdrxa1jv0prS9XpPjB6n6jAbHPb4kMYAFf3oTZHKPC6I-cxQyAo-AktSuJuSRq6zYUGnz542QpYV4esFnwQRP0ngK7waV6CT8HdtyQSMhmbiN3u63eFfcxh0UTy5D9Jc78',
      }
    ],
    subtotal: 37.00,
    deliveryFee: 0,
    total: 37.00,
    status: 'pago_pendiente',
    paymentMethod: 'yape',
    yapeVoucher: {
      orderId: 'MYA-0004',
      voucherCode: '#YAP-9284',
      operationCode: 'OP-84920419',
      amount: 37.00,
      senderName: 'Juan Pérez Mendoza',
      senderPhone: '*** *** 123',
      timestamp: '12 Oct 2026 - 19:41 h',
      channel: 'QR Dinámico POS',
      status: 'pendiente',
      autoChecks: {
        amountMatch: true,
        timeWindowValid: true,
        notReused: true,
        checksumValid: true
      },
      assignedCashier: 'Carlos M. (MFA activo)'
    },
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:42', note: 'Comanda registrada en cola de tesorería' }
    ]
  },
  {
    id: 'MYA-0003',
    createdAt: '19:38',
    timeAgo: 'Hace 7 min',
    clientName: 'María Gómez',
    clientPhone: '987 112 344',
    deliveryType: 'recojo',
    items: [
      {
        cartItemId: 'c4',
        productId: 'prod-broaster-simple',
        productName: '1x Broaster con papas',
        basePrice: 12.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Mayonesa', 'Ají'],
        specialNotes: '',
        itemTotal: 12.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJCg2ueAO6NhVkqr26PmR5gW3vxXeZ0Mk_M_t5DlDsJ7aVyLlcyapt12aAcUdBbC0WKuEDynnnO6bKatCnJuUsMl8uPfmmzYAVXEQ4j_1ojpO5pc65Qjdrxa1jv0prS9XpPjB6n6jAbHPb4kMYAFf3oTZHKPC6I-cxQyAo-AktSuJuSRq6zYUGnz542QpYV4esFnwQRP0ngK7waV6CT8HdtyQSMhmbiN3u63eFfcxh0UTy5D9Jc78',
      },
      {
        cartItemId: 'c5',
        productId: 'prod-broaster-arroz',
        productName: '1x Broaster + Arroz',
        basePrice: 13.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Ocopa'],
        specialNotes: '',
        itemTotal: 13.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlub503yPuo2fHJdVXMij22uzxOsYSaAnJAdjAQywZftMBiGMHdXJnD4Zx8mb43knC-AE2WeAaYL1hKKKV08cLbvXLbFrx2IEK8Z7gTE3nkWjbEABXoahlPU6SaDhFAA49B9QK5Hnn0FKePrZ8CLfpXCfqlzVWp4NgjwzOB3J9XHhvXV3ulMiOQUd9rJ3xvFNsMmVBA0xv4Ei9X45gG6cZTxq-S-Z9JgNEhO7YSy9cBym-1bkYjqY',
      }
    ],
    subtotal: 25.00,
    deliveryFee: 0,
    total: 25.00,
    status: 'pago_pendiente',
    paymentMethod: 'yape',
    yapeVoucher: {
      orderId: 'MYA-0003',
      voucherCode: '#YAP-9281',
      operationCode: 'OP-77319022',
      amount: 25.00,
      senderName: 'María Gómez Flores',
      senderPhone: '*** *** 344',
      timestamp: '12 Oct 2026 - 19:37 h',
      channel: 'QR Dinámico POS',
      status: 'pendiente',
      autoChecks: {
        amountMatch: true,
        timeWindowValid: true,
        notReused: true,
        checksumValid: true
      },
      assignedCashier: 'Carlos M. (MFA activo)'
    },
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:38', note: 'Esperando validación Yape' }
    ]
  },
  {
    id: 'MYA-0002',
    createdAt: '19:30',
    timeAgo: 'Hace 15 min',
    clientName: 'Carlos Quispe',
    clientPhone: '955 889 001',
    deliveryType: 'delivery',
    address: 'Jr. Los Claveles 442 - SMP',
    items: [
      {
        cartItemId: 'c6',
        productId: 'prod-hamburguesa',
        productName: '3x Hamburguesas Especiales',
        basePrice: 12.00,
        quantity: 3,
        isChaufa: false,
        selectedSauces: ['Todas las cremas'],
        specialNotes: 'Con bastante ají',
        itemTotal: 36.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8o4J_EF_Bi-QIa6bys0yw4h5CYtcqMT_5pyhZyBYtl8KBfHAUD5Eer1uxHlJlkmlIijTlKTF1Znk--XWx6bgmlaH9TFNIlvekI8iLPi6Exn5ZxjRdp9DXcKd9q1NfiavFpKBrz7U-fT3EcYTnQpeUL8R0esUE0sqWZwFNgttfxWRwW4jICbF8523jxdaWbjkK76C5WuEsVrOTNFt44G7dQm9H2VgB4kQgfVQCY69ezjsLNXtIV4',
      },
      {
        cartItemId: 'c7',
        productId: 'prod-alitas-bbq',
        productName: '1x Porción Tequeños',
        basePrice: 9.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Guacamole'],
        specialNotes: '',
        itemTotal: 9.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCojwzpTaAbE7JErtCbKyJu_mbTO0RQVDrgwO6nx7uHoHFSPftNdSQrpjUFnJCCAnzr67PJKER-vR8sC-BAknGKvnrAPTbz-FTOli9JPOQTDQIMLQj9pylhrn1XfddPuFDZJDaHCpibLMJkMETiB0EDCYK2L-1r0Me-jcIRuJrCfoL07jzCpoV_rvqWMfCVxqY6cVQmYReasw0SSLghYIPmiiW5DGGIpDbi526Wjp1pyizIC0BUZco',
      }
    ],
    subtotal: 45.00,
    deliveryFee: 0,
    total: 45.00,
    status: 'pago_pendiente',
    paymentMethod: 'yape',
    yapeVoucher: {
      orderId: 'MYA-0002',
      voucherCode: '#YAP-9275',
      operationCode: 'OP-61920194',
      amount: 45.00,
      senderName: 'Carlos Quispe Alvarez',
      senderPhone: '*** *** 001',
      timestamp: '12 Oct 2026 - 19:29 h',
      channel: 'QR Dinámico POS',
      status: 'pendiente',
      autoChecks: {
        amountMatch: true,
        timeWindowValid: true,
        notReused: true,
        checksumValid: true
      },
      assignedCashier: 'Carlos M. (MFA activo)'
    },
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:30', note: 'Esperando confirmación de cajero' }
    ]
  },
  {
    id: 'MYA-0001',
    createdAt: '19:25',
    timeAgo: 'Hace 20 min',
    clientName: 'Rosa Huamán',
    clientPhone: '923 445 667',
    deliveryType: 'recojo',
    items: [
      {
        cartItemId: 'c8',
        productId: 'prod-broaster-arroz',
        productName: '1x Broaster + Arroz Chaufa',
        basePrice: 15.00,
        quantity: 1,
        isChaufa: true,
        selectedSauces: ['Mayonesa', 'Ají'],
        specialNotes: 'Bien tostado',
        itemTotal: 17.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlub503yPuo2fHJdVXMij22uzxOsYSaAnJAdjAQywZftMBiGMHdXJnD4Zx8mb43knC-AE2WeAaYL1hKKKV08cLbvXLbFrx2IEK8Z7gTE3nkWjbEABXoahlPU6SaDhFAA49B9QK5Hnn0FKePrZ8CLfpXCfqlzVWp4NgjwzOB3J9XHhvXV3ulMiOQUd9rJ3xvFNsMmVBA0xv4Ei9X45gG6cZTxq-S-Z9JgNEhO7YSy9cBym-1bkYjqY',
      }
    ],
    subtotal: 15.00,
    deliveryFee: 0,
    total: 15.00,
    status: 'en_cocina',
    paymentMethod: 'yape',
    yapeVoucher: {
      orderId: 'MYA-0001',
      voucherCode: '#YAP-9269',
      operationCode: 'OP-55102983',
      amount: 15.00,
      senderName: 'Rosa Huamán Salazar',
      senderPhone: '*** *** 667',
      timestamp: '12 Oct 2026 - 19:24 h',
      channel: 'QR Dinámico POS',
      status: 'aprobado',
      autoChecks: {
        amountMatch: true,
        timeWindowValid: true,
        notReused: true,
        checksumValid: true
      },
      verifiedBy: 'Carlos Mendoza (Cajero 01)',
      verifiedAt: '19:26'
    },
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:25', note: 'Registrado' },
      { status: 'pago_validado', label: 'Pago verificado', timestamp: '19:26', note: 'Yape confirmado por Carlos M.' },
      { status: 'en_cocina', label: 'En preparación', timestamp: '19:27', note: 'El chef está friendo el broaster' }
    ]
  },
  {
    id: 'MYA-0005',
    createdAt: '19:35',
    timeAgo: 'Hace 10 min',
    clientName: 'Patricia Silva',
    clientPhone: '944 112 889',
    deliveryType: 'mesa',
    tableNumber: 'Mesa 04',
    items: [
      {
        cartItemId: 'c9',
        productId: 'prod-hamburguesa',
        productName: '2x Hamburguesa Clásica Mordisco',
        basePrice: 10.00,
        quantity: 2,
        isChaufa: false,
        selectedSauces: ['Tártara aparte'],
        specialNotes: 'Sin cebolla',
        itemTotal: 20.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8o4J_EF_Bi-QIa6bys0yw4h5CYtcqMT_5pyhZyBYtl8KBfHAUD5Eer1uxHlJlkmlIijTlKTF1Znk--XWx6bgmlaH9TFNIlvekI8iLPi6Exn5ZxjRdp9DXcKd9q1NfiavFpKBrz7U-fT3EcYTnQpeUL8R0esUE0sqWZwFNgttfxWRwW4jICbF8523jxdaWbjkK76C5WuEsVrOTNFt44G7dQm9H2VgB4kQgfVQCY69ezjsLNXtIV4',
      },
      {
        cartItemId: 'c10',
        productId: 'prod-broaster-simple',
        productName: '1x Broaster Pechuga',
        basePrice: 12.00,
        quantity: 1,
        isChaufa: false,
        selectedSauces: ['Doble ají pollero'],
        specialNotes: 'Pechuga jugosa',
        itemTotal: 12.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJCg2ueAO6NhVkqr26PmR5gW3vxXeZ0Mk_M_t5DlDsJ7aVyLlcyapt12aAcUdBbC0WKuEDynnnO6bKatCnJuUsMl8uPfmmzYAVXEQ4j_1ojpO5pc65Qjdrxa1jv0prS9XpPjB6n6jAbHPb4kMYAFf3oTZHKPC6I-cxQyAo-AktSuJuSRq6zYUGnz542QpYV4esFnwQRP0ngK7waV6CT8HdtyQSMhmbiN3u63eFfcxh0UTy5D9Jc78',
      }
    ],
    subtotal: 32.00,
    deliveryFee: 0,
    total: 32.00,
    status: 'en_cocina',
    paymentMethod: 'yape',
    urgent: true,
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:35', note: 'Salón' },
      { status: 'pago_validado', label: 'Pago confirmado', timestamp: '19:36', note: 'Verificado' },
      { status: 'en_cocina', label: 'En cocina', timestamp: '19:37', note: 'Fritura activa' }
    ]
  },
  {
    id: 'MYA-0000',
    createdAt: '19:15',
    timeAgo: 'Hace 30 min',
    clientName: 'Lucía Mendoza',
    clientPhone: '911 223 344',
    deliveryType: 'recojo',
    items: [
      {
        cartItemId: 'c11',
        productId: 'prod-broaster-simple',
        productName: '3x Porciones de Broaster Familiar',
        basePrice: 18.00,
        quantity: 3,
        isChaufa: false,
        selectedSauces: ['Todas las salsas'],
        specialNotes: 'Empacado térmico',
        itemTotal: 54.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJCg2ueAO6NhVkqr26PmR5gW3vxXeZ0Mk_M_t5DlDsJ7aVyLlcyapt12aAcUdBbC0WKuEDynnnO6bKatCnJuUsMl8uPfmmzYAVXEQ4j_1ojpO5pc65Qjdrxa1jv0prS9XpPjB6n6jAbHPb4kMYAFf3oTZHKPC6I-cxQyAo-AktSuJuSRq6zYUGnz542QpYV4esFnwQRP0ngK7waV6CT8HdtyQSMhmbiN3u63eFfcxh0UTy5D9Jc78',
      }
    ],
    subtotal: 54.00,
    deliveryFee: 0,
    total: 54.00,
    status: 'listo_entrega',
    paymentMethod: 'efectivo',
    timeline: [
      { status: 'pago_pendiente', label: 'Pedido recibido', timestamp: '19:15', note: 'En caja' },
      { status: 'en_cocina', label: 'En cocina', timestamp: '19:16', note: 'Listo' },
      { status: 'listo_entrega', label: 'Empacado', timestamp: '19:28', note: 'Listo para recojo en mostrador' }
    ]
  }
];

export const INITIAL_SECURITY_LOGS: SecurityAuditLog[] = [
  {
    id: 'log-001',
    timestamp: '19:42:10',
    eventType: 'MFA_AUTH_SUCCESS',
    severity: 'info',
    description: 'Sesión iniciada con éxito por Cajero Carlos Mendoza. Validación TOTP verificada.',
    operator: 'Carlos Mendoza (ID: 01)',
    clientIp: '190.237.112.45'
  },
  {
    id: 'log-002',
    timestamp: '19:39:15',
    eventType: 'YAPE_VERIFIED',
    severity: 'info',
    description: 'Comprobante Yape OP-55102983 verificado y asociado al pedido MYA-0001 (S/ 15.00).',
    operator: 'Carlos Mendoza',
    clientIp: '190.237.112.45'
  },
  {
    id: 'log-003',
    timestamp: '19:31:02',
    eventType: 'YAPE_DUPLICATE_BLOCKED',
    severity: 'critical',
    description: 'ALERTA ANTIFRAUDE: Intento de reutilización de comprobante OP-84920419 bloqueado automáticamente.',
    operator: 'Motor de Validación POS',
    clientIp: '179.6.14.88'
  },
  {
    id: 'log-004',
    timestamp: '19:28:44',
    eventType: 'INPUT_SANITIZATION_FLAG',
    severity: 'warning',
    description: 'Caracteres HTML especiales sanitizados en campo observaciones de cocina.',
    operator: 'Filtro WAF Cliente',
    clientIp: '190.236.70.19'
  }
];
