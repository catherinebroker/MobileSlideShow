const slides = {
    heads: [
        {
          id: 1,
          description:
            'A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.',
          title: 'Large Cyclops',
          src: images('./head-big-eye.png'),
          type: 'heads',
          cost: 1225.5,
        },
        {
          id: 2,
          description: 'A friendly robot head with two eyes and a smile -- great for domestic use.',
          title: 'Friendly Bot',
          src: images('./head-friendly.png'),
          cost: 945.0,
          type: 'heads',
          onSale: true,
        },
        {
          id: 3,
          description:
            'A large three-eyed head with a shredder for a mouth -- great for crushing light medals or shredding documents.',
          title: 'Shredder',
          src: images('./head-shredder.png'),
          type: 'heads',
          cost: 1275.5,
        },
    ],
    arms: [
        {
          id: 1,
          description: 'An articulated arm with a claw -- great for reaching around corners or working in tight spaces.',
          title: 'Articulated',
          src: images('./arm-articulated-claw.png'),
          type: 'arms',
          cost: 275,
        },
        {
          id: 2,
          description: 'An arm with two independent claws -- great when you need an extra hand. Need four hands? Equip your bot with two of these arms.',
          title: 'Two Clawed',
          src: images('./arm-dual-claw.png'),
          type: 'arms',
          cost: 285,
        },
        {
          id: 3,
          description: 'A telescoping arm with a grabber.',
          title: 'Grabber',
          src: images('./arm-grabber.png'),
          type: 'arms',
          cost: 205.5,
        },
    ],
};