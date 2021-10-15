const priceFormatter = new Intl.NumberFormat("en-US");

const css = {
  window: {
    horizontalPadding: {
      xs: "20rem",
      sm: "40rem",
      lg: "7%"
    }
  }
}

/**
 * https://getbootstrap.com/docs/5.0/layout/breakpoints/
 * All breakpoints defined to accomodate rule (min-width: *rem)
 */
const viewport = {
  sm: "36em",
  md: "48em",
  lg: "62em",
  xl: "75em"
}

const strings = {
  cart: {
    emptyTitle: "Your cart is empty",
    emptyDescription: "Looks like you haven't added anything to your cart yet"
  },
  checkout: {
    cashOption: `
      The 'Cash on Delivery' option enables you to pay in cash when our delivery courier
      arrives at your residence. Just make sure your address is correct so that your order
      will not be cancelled.
    `,
    orderSuccess: {
      thankYou: "THANK YOU FOR YOUR ORDER",
      description: "You will receive an email confirmation shortly.",
      loading: "Hold on while we are trying to complete the transaction...",
      errorTitle: "Opps! Some error occured",
      errorDescription: `
        Seems like there is an error while trying to complete the transaction.
        Please try again later
      `
    }
  },
  footnote: {
    description: `
      Located at the heart of New York City, Audiophile is the premier store for high
      end headphones, earphones, speakers, and audio accessories. We have a large 
      showroom and luxury demonstration rooms available for you to browse and 
      experience a wide range of our products. Stop by our store to meet some of the
      fantastic people who make Audiophile the best place to buy your portable audio
      equipment.
    `
  },
  footer: {
    description: `
      Audiophile is an all in one stop to fulfill your audio needs. We're a small
      team of music lovers and sound specialists who are devoted to helping you get
      the most out of personal audio. Come and visit our demo facility - we're open
      7 days a week.
    `,
    copyright: 'Copyright 2021. All Rights Reserved'
  },
  notFound: {
    title: "Opps! Something's missing...",
    description: `
      It seems like the page you were looking for doesn't exist, isn't available or 
      was loading incorrectly.
    `
  }
}

//Placeholder data
const data = {
  headphones: {
    "xx99-mk2": {
      new: true,
      name: "XX99 Mark II",
      shortName: "XX99 MK II",
      description: `
        The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines
        your premium headphone experience by reproducing the balanced depth and precision
        of studio-quality sound.
      `,
      price: 2999,
      features: [
        `
        Featuring a genuine leather head strap and premium earcups, these headphones deliver
        superior comfort for those who like to enjoy endless listening. It includes intuitive
        controls designed for any situation. Whether you're taking a business call or just in
        your own personal space, the auto on/off and pause features ensure that you'll never
        miss a beat  
        `,
        `
        The advanced Active Noise Cancellation with built-in equalizer allow you to experience
        your audio world on your terms. It lets you enjoy our audio in peace, but quickly interact
        with your surrondings when you need to. Combined with Bluetooth 5.0 compliant connectivity
        and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge
        technology, and a modern design aesthetic
        `
      ],
      inTheBox: [
        { number: 1, name: "Headphone Unit" },
        { number: 2, name: "Replacement Earcups" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "3.5mm 5m Audio Cable" },
        { number: 1, name: "Travel Bag" }
      ]
    },
    "xx99-mk1": {
      new: false,
      name: "XX99 Mark I",
      shortName: "XX99 MK I",
      description: `
        As the gold standard for headphones, the classic XX99 Mark I offers detailed and
        accurate audio reproduction for audiophiles, mixing engineers, and music aficionados
        alike in studios and on the go.
      `,
      price: 1750,
      features: [
        `
          As the headphones all others are measured against, the XX99 Mark I demonstrates over
          five decades of audio expertise, redefining the critical listening experience. This
          pair of closed-back headphones are made of industrial, aerospace-grade materials to
          emphasize durability at relatively light weight of 11 oz.
        `,
        `
          From the handcrafted microfiber ear cushions to the robust metal headband with inner
          damping element, the components work together to deliver comfort and uncompromising
          sound. Its closed-back design delivers up to 27 dB of passive noise cancellation,
          reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a
          specially tuned cable is included with a balanced gold connector.
        `
      ],
      inTheBox: [
        { number: 1, name: "Headphone Unit" },
        { number: 2, name: "Replacement Earcups" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "3.5mm 5m Audio Cable" }
      ]
    },
    "xx59": {
      new: false,
      name: "XX59",
      shortName: "XX59",
      description: `
        Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59
        headphones. The stylish yet durable versatile wireless headset is a brilliant companion
        at home or on the move.
      `,
      price: 899,
      features: [
        `
          These headphones have been created from durable, high-quality materials tough enough
          to take anywhere. Its compact folding design fuses comfort and minimalist style making
          it perfect for travel. Flawless transmission is assured by the latest wireless technology
          engineered for audio synchronization with videos.
        `,
        `
          More than a simple pair of headphones, this headset features a pair of built-in microphones
          for clear, hands-free calling when paired with a compatible smartphone. Controlling music and
          calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how
          you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery
          life that can be rapidly recharged via USB-C.
        `
      ],
      inTheBox: [
        { number: 1, name: "Headphone Unit" },
        { number: 2, name: "Replacement Earcups" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "3.5mm 5m Audio Cable" }
      ]
    }
  },
  speakers: {
    "zx9": {
      new: true,
      name: "ZX9",
      shortName: "ZX9",
      description: `
        Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker
        system that offers truly wireless connectivity - creating new possibilities for more 
        pleasing and practical audio setups.
      `,
      price: 4500,
      features: [
        `
        Connect via Bluetooth or nearly any wired source. This speaker features optical, digital
        coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five
        wired source devices connected for easy switching. Improved Bluetooth technology offers
        near lossless audio quality at up to 328ft (100m).
        `,
        `
        Discover clear, more natural sounding highs than the competition with ZX9's signature
        planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of
        a 6.5" aluminium alloy bass unit. You'll be able to enjoy equal sound quality whether in a
        large room or small den. Furthermore, you will experience new sensations from old songs
        since it can respond to even the subtle waveforms.
        `
      ],
      inTheBox: [
        { number: 2, name: "Speaker Unit" },
        { number: 2, name: "Speaker Cloth Panel" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "3.5mm 10m Audio Cable" },
        { number: 1, name: "10m Optical Cable" }
      ]
    },
    "zx7": {
      new: false,
      name: "ZX7",
      shortName: "ZX7",
      description: `
        Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses
        high-end audiophile components that represents the top of the line powered speakers for
        home or studio use.
      `,
      price: 3500,
      features: [
        `
          Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate
          and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The
          woofers are made from aluminium that produces a unique and clear sound. XLR inputs allow
          you to connect to a mixer for more advanced usage.
        `,
        `
          The ZX7 speaker is the perfect blend of stylish design and high performance. It houses
          an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity
          allows pairing through bluetooth or traditional optical and RCA input. Switch input sources
          and control volume at your finger tips with the included wiresless remote. This versatile
          speaker is equipped to deliver an authentic listening experience.
        `
      ],
      inTheBox: [
        { number: 2, name: "Speaker Unit" },
        { number: 2, name: "Speaker Cloth Panel" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "3.5mm 7.5m Audio Cable" },
        { number: 1, name: "7.5m Optical Cable" }
      ]
    }
  },
  earphones: {
    "yx1": {
      new: true,
      name: "YX1 Wireless",
      shortName: "YX1",
      description: `
        Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless
        Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its
        active noise cancellation feature.
      `,
      price: 599,
      features: [
        `
        Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved
        ergonomics designed for full way wearing, these revolutionary earphones have been finely 
        crafted to provide you with the perfect fit, delivering complete comfort all day long while
        enjoying exceptional noise isolation and truly immersive sound.
        `,
        `
        The YX1 Wireless Earphones features customizable controls for volume, music, calls, and 
        voice assistants built into both earbuds. The new 7-hour battery life can be extended up to
        28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship
        with a splash resistant design now available in an all new white and grey color scheme as
        well as the popular classic black.
        `
      ],
      inTheBox: [
        { number: 2, name: "Earphone Unit" },
        { number: 6, name: "Multi-size Earplugs" },
        { number: 1, name: "User Manual" },
        { number: 1, name: "USB-C Charging Cable" },
        { number: 1, name: "Travel Pouch" }
      ]
    }
  }
}

export {
  priceFormatter,
  css,
  viewport,
  strings,
  data
}