import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Play,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import exteriorImage from "@assets/image_1787839319891.png";
import menuBoardImage from "@assets/ChatGPT_Image_Aug_27,_2026,_07_52_54_PM_1787840699305.png";
import logoImage from "@assets/a-modern-vector-logo-for--shabari-food---drinks---_1787838795465.svg";
import tandooriAlooImage from "@assets/dish-images/tandoori-aloo.jpg";
import paneerPahadiTikkaImage from "@assets/dish-images/paneer-pahadi-tikka.jpg";
import chickenTikkaImage from "@assets/dish-images/chicken-tikka.jpg";
import muttonChillyImage from "@assets/dish-images/mutton-chilly.jpg";
import paneerTikkaMasalaImage from "@assets/dish-images/paneer-tikka-masala.jpg";
import chickenAdarkiImage from "@assets/dish-images/chicken-adarki.jpg";
import muttonRaraImage from "@assets/dish-images/mutton-rara.jpg";
import muttonDumBiryaniImage from "@assets/dish-images/mutton-dum-biryani.jpg";
import vegHyderabadiBiryaniImage from "@assets/dish-images/veg-hyderabadi-biryani.jpg";
import dalTadkaImage from "@assets/dish-images/dal-tadka.jpg";
import orangeBlossomsImage from "@assets/dish-images/orange-blossoms.jpg";
import virginMojitoImage from "@assets/dish-images/virgin-mojito.jpg";
import blueLagoonImage from "@assets/dish-images/blue-lagoon.jpg";
import milkImage from "@assets/dish-images/milk.jpg";
import { Toaster } from "@/components/ui/toaster";

type Category = "All" | "Starters" | "Main Course" | "Beverages";
type MenuCategory = Exclude<Category, "All">;
type Dish = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  position: string;
  image: string;
};
type CartLine = {
  dish: Dish;
  quantity: number;
};

const dishes: Dish[] = [
  {
    id: "tandoori-aloo",
    name: "Tandoori Aloo",
    category: "Starters",
    price: 120,
    description: "Baby potatoes, smoked spices, and a bright mint chutney.",
    position: "49% 35%",
    image: tandooriAlooImage,
  },
  {
    id: "paneer-pahadi-tikka",
    name: "Paneer Pahadi Tikka",
    category: "Starters",
    price: 200,
    description: "Herb-marinated paneer with a gentle smoky edge.",
    position: "49% 35%",
    image: paneerPahadiTikkaImage,
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    category: "Starters",
    price: 240,
    description: "Clay-oven roasted chicken, lacquered in Shabari masala.",
    position: "84% 34%",
    image: chickenTikkaImage,
  },
  {
    id: "mutton-chilly",
    name: "Mutton Chilly",
    category: "Starters",
    price: 300,
    description:
      "Tender mutton, green chilli, peppers, and a glossy wok sauce.",
    position: "84% 75%",
    image: muttonChillyImage,
  },
  {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    category: "Main Course",
    price: 220,
    description: "Charred paneer, tomato makhani, and kasuri methi.",
    position: "68% 14%",
    image: paneerTikkaMasalaImage,
  },
  {
    id: "chicken-adarki",
    name: "Chicken Adarki",
    category: "Main Course",
    price: 270,
    description: "Ginger-led curry with a slow, warming finish.",
    position: "85% 14%",
    image: chickenAdarkiImage,
  },
  {
    id: "mutton-rara",
    name: "Mutton Rara",
    category: "Main Course",
    price: 350,
    description: "Minced mutton, whole spices, and a deep onion gravy.",
    position: "15% 20%",
    image: muttonRaraImage,
  },
  {
    id: "mutton-dum-biryani",
    name: "Mutton Dum Biryani",
    category: "Main Course",
    price: 290,
    description: "Long-grain basmati layered with tender spiced mutton.",
    position: "17% 63%",
    image: muttonDumBiryaniImage,
  },
  {
    id: "veg-hyderabadi-biryani",
    name: "Veg Hyderabadi Biryani",
    category: "Main Course",
    price: 200,
    description: "Fragrant basmati, garden vegetables, and saffron steam.",
    position: "83% 62%",
    image: vegHyderabadiBiryaniImage,
  },
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    category: "Main Course",
    price: 140,
    description: "Yellow lentils finished with sizzling garlic and cumin.",
    position: "49% 75%",
    image: dalTadkaImage,
  },
  {
    id: "orange-blossoms",
    name: "Orange Blossoms",
    category: "Beverages",
    price: 180,
    description: "A bright, citrusy mocktail made for golden-hour sipping.",
    position: "11% 96%",
    image: orangeBlossomsImage,
  },
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    category: "Beverages",
    price: 180,
    description: "Fresh mint, lime, and fizz with a cool finish.",
    position: "30% 96%",
    image: virginMojitoImage,
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon",
    category: "Beverages",
    price: 180,
    description: "Electric citrus, chilled soda, and a little theatre.",
    position: "30% 96%",
    image: blueLagoonImage,
  },
  {
    id: "milk",
    name: "Milk",
    category: "Beverages",
    price: 30,
    description: "A simple, comforting pour to finish the table.",
    position: "89% 96%",
    image: milkImage,
  },
];

const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const guestReviews = [
  {
    quote: "Fresh food, friendly staff, clean place.",
    author: "Jagannath Sabat",
    detail: "Public guest review",
  },
  {
    quote:
      "Incredible food and fantastic service! The staff was friendly and attentive.",
    author: "Satish Lavshetty",
    detail: "Public guest review",
  },
  {
    quote:
      "Best place in Badlapur town for a small get-together with friends and family.",
    author: "Ashok",
    detail: "Public guest review",
  },
];

function App() {
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [orderError, setOrderError] = useState("");
  const [reserveOpen, setReserveOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 guests");

  const filteredDishes = useMemo(
    () =>
      activeCategory === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === activeCategory),
    [activeCategory],
  );
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, line) => sum + line.dish.price * line.quantity,
    0,
  );

  const navigate = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getQuantity = (dishId: string) =>
    cart.find((line) => line.dish.id === dishId)?.quantity ?? 0;

  const addToCart = (dish: Dish) => {
    setCart((current) => {
      const existing = current.find((line) => line.dish.id === dish.id);
      if (existing) {
        return current.map((line) =>
          line.dish.id === dish.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, { dish, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((line) => line.dish.id !== dishId));
      return;
    }
    setCart((current) =>
      current.map((line) =>
        line.dish.id === dishId ? { ...line, quantity } : line,
      ),
    );
  };

  const removeFromCart = (dishId: string) => {
    setCart((current) => current.filter((line) => line.dish.id !== dishId));
  };

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = customerName.trim();
    const phone = customerPhone.trim();
    const location = customerLocation.trim();

    if (!name || !phone || !location) {
      setOrderError(
        "Please complete your name, phone number, and address or table number.",
      );
      return;
    }

    if (phone.replace(/\D/g, "").length < 7) {
      setOrderError("Please enter a valid phone number.");
      return;
    }

    setOrderError("");
    const message = [
      "Hello Shabari Food & Drinks,",
      "",
      "*New Order Request*",
      `Name: ${name}`,
      `Phone Number: ${phone}`,
      `Address / Table Number: ${location}`,
      "",
      "*Order Details*",
      ...cart.map(
        (line) =>
          `- ${line.dish.name} x${line.quantity} — ${formatINR(line.dish.price * line.quantity)}`,
      ),
      "",
      `*Total: ${formatINR(cartTotal)}*`,
      "",
      "Please confirm my order. Thank you!",
    ].join("\n");

    const whatsappUrl = `https://wa.me/917028033399?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const submitReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Hello Shabari Food & Drinks,",
      "",
      "*Table Reservation Request*",
      `Name: ${resName}`,
      `Phone: ${resPhone}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      "",
      "Please confirm my table reservation. Thank you!",
    ].join("\n");

    const whatsappUrl = `https://wa.me/917028033399?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-200/10 bg-[#17100d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => navigate("home")}
            aria-label="Back to top"
            data-testid="button-logo-home"
            className="group flex items-center gap-3"
          >
            <img
              src={logoImage}
              alt="Shabari Food & Drinks"
              className="h-12 w-12 object-cover transition-transform group-hover:rotate-3"
            />
            <span className="hidden text-left sm:block">
              <span className="display block text-lg font-semibold tracking-wide text-[#f6d58c]">
                Shabari
              </span>
              <span className="eyebrow text-[9px] tracking-[.13em] text-[#bd9b70]">
                Food & Drinks
              </span>
            </span>
          </button>
          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Primary navigation"
          >
            {["story", "menu", "experience", "reviews", "visit"].map((item) => (
              <button
                key={item}
                onClick={() => navigate(item)}
                data-testid={`link-${item}`}
                className="nav-link text-sm capitalize text-[#d8c2a3] transition-colors hover:text-[#f5b84b]"
              >
                {item === "story"
                  ? "Our story"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="tel:+917028033399"
              data-testid="link-header-phone"
              className="hidden items-center gap-2 text-sm text-[#d8c2a3] transition-colors hover:text-[#f5b84b] lg:flex"
            >
              <Phone className="h-3.5 w-3.5" /> +91 70280 33399
            </a>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart${cartCount ? ` with ${cartCount} items` : ""}`}
              data-testid="button-header-cart"
              className="relative rounded-full border border-[#8f6338]/50 p-2.5 text-primary transition-colors hover:bg-[#382115]"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setReserveOpen(true);
                setSubmitted(false);
              }}
              data-testid="button-header-reserve"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[.12em] text-primary-foreground transition-transform hover:-translate-y-0.5 sm:block"
            >
              Reserve a table
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
              className="rounded-full border border-[#8f6338]/40 p-2.5 text-primary md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-amber-200/10 bg-[#17100d] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {["story", "menu", "experience", "visit"].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item)}
                  data-testid={`link-mobile-${item}`}
                  className="text-left text-base capitalize text-[#ead8bd]"
                >
                  {item === "story" ? "Our story" : item}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                }}
                data-testid="button-mobile-cart"
                className="rounded-full border border-primary/60 py-3 text-xs font-bold uppercase tracking-[.15em] text-primary"
              >
                Cart{cartCount ? ` (${cartCount})` : ""}
              </button>
              <button
                onClick={() => {
                  setReserveOpen(true);
                  setMobileOpen(false);
                  setSubmitted(false);
                }}
                data-testid="button-mobile-reserve"
                className="rounded-full bg-primary py-3 text-xs font-bold uppercase tracking-[.15em] text-primary-foreground"
              >
                Reserve
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-[760px] items-end overflow-hidden pt-28 lg:min-h-[820px]"
        >
          <img
            src={exteriorImage}
            alt="Shabari Food & Drinks glowing at night"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-65"
          />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_75%_30%,hsl(29_82%_42%/.22),transparent_30%),linear-gradient(90deg,hsl(24_27%_8%/.96)_0%,hsl(24_27%_8%/.76)_44%,hsl(24_27%_8%/.22)_100%)]" />
          <div className="absolute inset-0 z-10 bg-[#2a160b]/35 mix-blend-multiply" />
          <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
            <div className="max-w-3xl reveal">
              <p className="eyebrow mb-6">A table worth lingering at</p>
              <h1 className="display text-[clamp(3.4rem,9vw,8.4rem)] font-medium leading-[.9] tracking-[-.055em] text-[#f5ead5]">
                Come for the
                <br />
                <em className="font-medium text-primary">spice.</em> Stay for
                <br />
                the evening.
              </h1>
              <p className="mt-8 max-w-md text-base leading-7 text-[#e3cdb0] reveal reveal-delay-1">
                Rich Indian comfort food, poured drinks, and the kind of welcome
                that makes a weeknight feel like an occasion.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4 reveal reveal-delay-2">
                <button
                  onClick={() => navigate("menu")}
                  data-testid="button-hero-menu"
                  className="group flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1"
                >
                  Explore the menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    setReserveOpen(true);
                    setSubmitted(false);
                  }}
                  data-testid="button-hero-reserve"
                  className="rounded-full border border-[#e1b879]/50 bg-[#251710]/60 px-6 py-3.5 text-sm font-semibold text-[#f1d9ad] transition-colors hover:bg-[#3a2113]"
                >
                  Book your table
                </button>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-3 text-xs text-[#ceb99b] reveal reveal-delay-3">
              <span className="pulse-line h-px w-12 bg-primary" /> Scroll to
              discover <ArrowDown className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
        </section>

        <section
          id="story"
          className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36"
        >
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">The Shabari feeling</p>
              <h2 className="display mt-5 max-w-md text-5xl leading-[.98] tracking-[-.04em] text-[#f4e4c7] lg:text-7xl">
                The long way
                <br />
                <span className="text-primary">to a good meal.</span>
              </h2>
            </div>
            <div className="max-w-xl lg:pb-2">
              <p className="text-xl leading-8 text-[#ead3b2]">
                We believe the best evenings have a little theatre to them: the
                sizzle when a dish lands, the first pour, the table that keeps
                making room.
              </p>
              <p className="mt-6 leading-7 text-muted-foreground">
                Shabari brings together familiar Indian flavours and a modern
                room made for coming back to. Our kitchen follows the bold,
                generous spirit of the subcontinent — layered, lively, never in
                a hurry.
              </p>
              <button
                onClick={() => navigate("experience")}
                data-testid="button-story-discover"
                className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 text-sm font-semibold text-primary"
              >
                See what makes us different <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="section-rule mt-24" />
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              ["12+", "years of gathering"],
              ["47", "spices in the pantry"],
              ["7 days", "open every week"],
              ["1", "very warm welcome"],
            ].map(([number, label], index) => (
              <div key={label} className={`reveal reveal-delay-${index + 1}`}>
                <div className="display text-4xl text-[#f2cc82]">{number}</div>
                <div className="mt-2 text-xs uppercase tracking-[.12em] text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="menu" className="bg-[#20130d] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow">From the kitchen</p>
                <h2 className="display mt-4 text-5xl tracking-[-.04em] text-[#f6e4c6] lg:text-7xl">
                  Made for
                  <br />
                  <span className="text-primary">passing around.</span>
                </h2>
              </div>
              <div className="max-w-sm text-sm leading-6 text-muted-foreground lg:text-right">
                Start with something smoky. Find your comfort. Leave room for
                one more thing.
              </div>
            </div>
            <div
              className="mt-12 flex gap-2 overflow-x-auto border-b border-[#684529]/50 pb-4"
              role="tablist"
              aria-label="Menu categories"
            >
              {(
                ["All", "Starters", "Main Course", "Beverages"] as Category[]
              ).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                  data-testid={`button-filter-${category
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-[#bba181] hover:bg-[#382115] hover:text-[#f1d5a2]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDishes.map((dish, index) => {
                const quantity = getQuantity(dish.id);
                return (
                  <article
                    key={dish.id}
                    data-testid={`card-dish-${dish.id}`}
                    className="menu-card group overflow-hidden rounded-xl border border-[#6e4828]/40 bg-[#2a190f] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#160d09]">
                      <div
                        className="menu-card-image absolute inset-0 bg-cover"
                        style={{
                          backgroundImage: `url("${dish.image}")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a190f] via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-[#e7bd70]/35 bg-[#1d100a]/80 px-3 py-1 text-[10px] uppercase tracking-[.14em] text-[#f1c978]">
                        {dish.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="display text-2xl text-[#f3dfbc]">
                          {dish.name}
                        </h3>
                        <span className="shrink-0 font-mono text-sm text-primary">
                          {formatINR(dish.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {dish.description}
                      </p>
                      <button
                        onClick={() => addToCart(dish)}
                        data-testid={`button-add-to-cart-${dish.id}`}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/60 px-4 py-3 text-xs font-bold uppercase tracking-[.1em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Plus className="h-4 w-4" />
                        {quantity > 0
                          ? `Add another · ${quantity} in cart`
                          : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-xl border border-[#6e4828]/45 bg-[#2c1a10] p-6 sm:flex-row">
              <div>
                <p className="display text-2xl text-[#f2d6a3]">
                  Looking for the full spread?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our menu board has every plate, pour, and sweet ending.
                </p>
              </div>
              <button
                onClick={() => setMenuOpen(true)}
                data-testid="button-view-full-menu"
                className="flex shrink-0 items-center gap-2 rounded-full border border-primary/60 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View full menu board <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            {cartCount > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                data-testid="button-floating-cart"
                className="fixed bottom-6 right-5 z-40 flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:-translate-y-1 lg:right-8"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>View cart</span>
                <span className="border-l border-primary-foreground/30 pl-3">
                  {formatINR(cartTotal)}
                </span>
              </button>
            )}
          </div>
        </section>

        <section
          id="experience"
          className="relative overflow-hidden px-5 py-24 lg:px-8 lg:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div className="relative min-h-[450px] overflow-hidden rounded-2xl border border-[#754a29]/50">
              <img
                src={exteriorImage}
                alt="Warmly lit Shabari exterior"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180e0a] via-transparent to-[#32180d]/20" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                <div>
                  <p className="eyebrow">After sundown</p>
                  <p className="display mt-2 text-3xl text-[#f5dfb5]">
                    Your evening,
                    <br />
                    with better lighting.
                  </p>
                </div>
                <div className="float-soft rounded-full border border-[#e6b96b]/50 bg-[#2e180d]/80 p-4 text-primary">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow">Come as you are</p>
              <h2 className="display mt-5 text-5xl leading-[.98] tracking-[-.04em] text-[#f4e3c4] lg:text-6xl">
                A little
                <br />
                <span className="text-primary">more than dinner.</span>
              </h2>
              <p className="mt-7 leading-7 text-muted-foreground">
                Birthday tables, catch-up dinners, first dates, last-minute
                plans. There is always room for a good reason — or no reason at
                all.
              </p>
              <div className="mt-10 grid gap-6 border-t border-[#694327]/50 pt-7 sm:grid-cols-2">
                <div>
                  <Clock3 className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold text-[#efd5aa]">
                    Unhurried hours
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Lunch from 12:00. Dinner until 11:00 PM.
                  </p>
                </div>
                <div>
                  <Utensils className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold text-[#efd5aa]">
                    A generous table
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Vegetarian, non-veg, tandoor, and everything between.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setReserveOpen(true);
                  setSubmitted(false);
                }}
                data-testid="button-experience-reserve"
                className="mt-10 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1"
              >
                Make an evening of it
              </button>
            </div>
          </div>
        </section>

        <section
          id="reviews"
          className="relative overflow-hidden border-t border-[#754a29]/35 px-5 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow">From the table</p>
                <h2 className="display mt-5 text-5xl leading-[.98] tracking-[-.04em] text-[#f4e3c4] lg:text-6xl">
                  Good food,
                  <br />
                  <span className="text-primary">good company.</span>
                </h2>
                <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
                  Local guests keep coming back for the flavours, warm service,
                  and easy-going tables.
                </p>
              </div>
              <a
                href="https://www.justdial.com/Mumbai/Shabari-Foods-N-Drinks-Badlapur/022PXX22-XX22-160325135030-F2M4_BZDET/reviews"
                target="_blank"
                rel="noreferrer"
                data-testid="link-review-source"
                className="group shrink-0 rounded-xl border border-[#8e5a2b]/60 bg-[#25170f] p-5 transition-colors hover:border-primary/70"
              >
                <div className="flex gap-1 text-primary">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="display mt-3 text-3xl text-[#f6dfb7]">3.9 / 5</p>
                <p className="mt-1 text-xs uppercase tracking-[.14em] text-[#a98b6e]">
                  3,549 public ratings
                </p>
                <p className="mt-4 text-xs font-semibold text-primary transition-colors group-hover:text-[#f6dfb7]">
                  Read all reviews{" "}
                  <ExternalLink className="ml-1 inline h-3 w-3" />
                </p>
              </a>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {guestReviews.map((review) => (
                <figure
                  key={review.author}
                  className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#704728]/45 bg-[#2a190f] p-6"
                >
                  <blockquote className="display text-2xl leading-tight text-[#f3dfbc]">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-8 border-t border-[#704728]/50 pt-4">
                    <p className="text-sm font-semibold text-[#e9c989]">
                      {review.author}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[.12em] text-[#8f7358]">
                      {review.detail}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-xs leading-5 text-[#8f7358]">
              Short excerpts reproduced from the public Shabari Foods N Drinks
              review listing.{" "}
              <a
                href="https://www.justdial.com/Mumbai/Shabari-Foods-N-Drinks-Badlapur/022PXX22-XX22-160325135030-F2M4_BZDET/reviews"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Verify the reviews on Justdial
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="visit"
          className="border-y border-[#754a29]/35 bg-[#17100d] px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Find your way here</p>
              <h2 className="display mt-4 text-5xl text-[#f4e0bc] lg:text-6xl">
                The lights are
                <br />
                <span className="text-primary">on for you.</span>
              </h2>
              <div className="mt-8 space-y-5 text-sm text-[#cdb696]">
                <a
                  href="https://maps.app.goo.gl/cL2zK1Em1idxsk8X9"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-google-maps"
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Near Aptewadi Naka, Highway
                    <br />
                    Badlapur E, Aptewadi
                    <br />
                    Maharashtra Industrial Development Corporation
                    <br />
                    Mumbai, Maharashtra 421503
                    <br />
                    <span className="mt-1 inline-flex items-center gap-1 text-primary">
                      Open in maps <ExternalLink className="h-3 w-3" />
                    </span>
                  </span>
                </a>
                <a
                  href="tel:+917028033399"
                  data-testid="link-visit-phone"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" /> +91 70280 33399
                </a>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-[#704728]/45 bg-[#25170f] p-6">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h3 className="mt-5 font-semibold text-[#eed8af]">
                  Opening hours
                </h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-5">
                    <span>Monday – Thursday</span>
                    <span className="text-[#dfbf88]">12–11 PM</span>
                  </div>
                  <div className="flex justify-between gap-5">
                    <span>Friday – Sunday</span>
                    <span className="text-[#dfbf88]">12–11:30 PM</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[#704728]/45 bg-[#25170f] p-6">
                <div className="flex h-5 items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                </div>
                <h3 className="mt-5 font-semibold text-[#eed8af]">
                  Stay in the loop
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  New plates, special evenings, and the occasional excuse to
                  come by.
                </p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-instagram"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#ffe4ad]"
                >
                  <Instagram className="h-4 w-4" /> @shabari.food.drinks
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#100b09] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <img
              src={logoImage}
              alt="Shabari Food & Drinks"
              className="h-14 w-14 object-cover"
            />
            <p className="mt-4 text-sm text-[#9f866c]">
              Good food. Good people. Stay a while.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="eyebrow">Shabari Food & Drinks</p>
            <p className="mt-3 text-xs text-[#806b58]">
              © 2024 Shabari. Made for evenings.
            </p>
          </div>
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-[80]" role="presentation">
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="absolute inset-0 h-full w-full cursor-default bg-[#0c0705]/75 backdrop-blur-[2px]"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="modal-backdrop absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#8e5a2b]/60 bg-[#20130d] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#704728]/50 px-6 py-5">
              <div>
                <p className="eyebrow">Your table, your way</p>
                <h2 className="display mt-1 text-3xl text-[#f6dfb7]">
                  Your cart
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                data-testid="button-close-cart"
                aria-label="Close cart"
                className="rounded-full border border-[#8e5a2b]/60 p-2 text-primary transition-colors hover:bg-[#3b2213]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-primary/70" />
                <h3 className="display mt-5 text-3xl text-[#f6dfb7]">
                  It’s quiet in here.
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                  Add a few favourites from the menu and we’ll keep them ready
                  for your table.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("menu");
                  }}
                  data-testid="button-cart-browse-menu"
                  className="mt-7 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  Browse the menu
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePlaceOrder}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {cart.map((line) => (
                    <div
                      key={line.dish.id}
                      data-testid={`cart-item-${line.dish.id}`}
                      className="flex gap-4 border-b border-[#704728]/40 pb-4"
                    >
                      <div
                        className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url("${line.dish.image}")`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="display text-xl leading-tight text-[#f3dfbc]">
                              {line.dish.name}
                            </p>
                            <p className="mt-1 font-mono text-xs text-primary">
                              {formatINR(line.dish.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(line.dish.id)}
                            data-testid={`button-remove-${line.dish.id}`}
                            aria-label={`Remove ${line.dish.name}`}
                            className="shrink-0 rounded p-1 text-[#a98b6e] transition-colors hover:bg-[#3b2213] hover:text-primary"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-[#8e5a2b]/70 bg-[#160c08]">
                            <button
                              onClick={() =>
                                updateQuantity(line.dish.id, line.quantity - 1)
                              }
                              data-testid={`button-decrease-${line.dish.id}`}
                              aria-label={`Decrease ${line.dish.name} quantity`}
                              className="p-1.5 text-primary transition-colors hover:bg-[#3b2213]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span
                              className="min-w-7 text-center text-xs text-[#f3dfbc]"
                              data-testid={`quantity-${line.dish.id}`}
                            >
                              {line.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(line.dish.id, line.quantity + 1)
                              }
                              data-testid={`button-increase-${line.dish.id}`}
                              aria-label={`Increase ${line.dish.name} quantity`}
                              className="p-1.5 text-primary transition-colors hover:bg-[#3b2213]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-mono text-sm text-[#f3dfbc]">
                            {formatINR(line.dish.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="max-h-[58%] shrink-0 overflow-y-auto border-t border-[#704728]/50 bg-[#25170f] px-6 py-6">
                  <div className="space-y-3">
                    <p className="eyebrow">Where should we send it?</p>
                    <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                      Name
                      <input
                        required
                        type="text"
                        value={customerName}
                        onChange={(event) => {
                          setCustomerName(event.target.value);
                          setOrderError("");
                        }}
                        autoComplete="name"
                        placeholder="Your name"
                        data-testid="input-customer-name"
                        className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] placeholder:text-[#745d49] outline-none transition-colors focus:border-primary"
                      />
                    </label>
                    <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                      Phone number
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(event) => {
                          setCustomerPhone(event.target.value);
                          setOrderError("");
                        }}
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        data-testid="input-customer-phone"
                        className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] placeholder:text-[#745d49] outline-none transition-colors focus:border-primary"
                      />
                    </label>
                    <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                      Address / table number
                      <input
                        required
                        type="text"
                        value={customerLocation}
                        onChange={(event) => {
                          setCustomerLocation(event.target.value);
                          setOrderError("");
                        }}
                        autoComplete="street-address"
                        placeholder="Delivery address or table number"
                        data-testid="input-customer-location"
                        className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] placeholder:text-[#745d49] outline-none transition-colors focus:border-primary"
                      />
                    </label>
                    {orderError && (
                      <p
                        id="order-error"
                        role="alert"
                        data-testid="text-order-error"
                        className="text-xs leading-5 text-[#ff9f87]"
                      >
                        {orderError}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#cdb696]">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#f3dfbc]">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="display text-2xl text-[#f6dfb7]">
                      Total
                    </span>
                    <span className="font-mono text-xl text-primary">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    data-testid="button-cart-reserve"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3.5 text-sm font-bold text-[#071b0d] transition-transform hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                  >
                    <Phone className="h-4 w-4" />
                    Place Order via WhatsApp
                  </button>
                  <p className="mt-3 text-center text-xs text-[#876f57]">
                    Your order opens in WhatsApp for confirmation.
                  </p>
                </div>
              </form>
            )}
          </aside>
        </div>
      )}

      {menuOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[#0c0705]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full menu board"
        >
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-auto rounded-xl border border-[#8e5a2b] bg-[#1c100a] p-3 shadow-2xl">
            <button
              onClick={() => setMenuOpen(false)}
              data-testid="button-close-menu"
              aria-label="Close full menu"
              className="sticky right-0 top-0 z-10 ml-auto flex rounded-full border border-[#c18843]/60 bg-[#2a160c] p-2 text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={menuBoardImage}
              alt="Full Shabari menu board with food and drink prices"
              className="mt-2 w-full rounded-md"
            />
          </div>
        </div>
      )}

      {reserveOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[#0c0705]/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Reserve a table"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#8e5a2b]/70 bg-[#24150e] p-7 shadow-2xl sm:p-9">
            <button
              onClick={() => setReserveOpen(false)}
              data-testid="button-close-reservation"
              aria-label="Close reservation form"
              className="absolute right-5 top-5 rounded-full p-2 text-[#c4a27a] transition-colors hover:bg-[#3b2213] hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <p className="eyebrow mt-7">Table requested</p>
                <h2 className="display mt-3 text-4xl text-[#f6dfb7]">
                  We’ll see you soon.
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                  Your request is with our team. We’ll call shortly to confirm
                  the details.
                </p>
                <button
                  onClick={() => setReserveOpen(false)}
                  data-testid="button-close-confirmation"
                  className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Save your seat</p>
                <h2 className="display mt-3 text-4xl text-[#f6dfb7]">
                  Let’s make a night of it.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Tell us when you’re coming and we’ll take care of the rest.
                </p>
                <form onSubmit={submitReservation} className="mt-7 space-y-4">
                  <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                    Name
                    <input
                      required
                      type="text"
                      value={resName}
                      onChange={(event) => setResName(event.target.value)}
                      placeholder="Your name"
                      data-testid="input-reservation-name"
                      className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] placeholder:text-[#745d49] outline-none focus:border-primary"
                    />
                  </label>

                  <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                    Phone Number
                    <input
                      required
                      type="tel"
                      value={resPhone}
                      onChange={(event) => setResPhone(event.target.value)}
                      placeholder="+91 98765 43210"
                      data-testid="input-reservation-phone"
                      className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] placeholder:text-[#745d49] outline-none focus:border-primary"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs uppercase tracking-[.1em] text-[#b99b76]">
                      Date
                      <input
                        required
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        data-testid="input-reservation-date"
                        className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] outline-none focus:border-primary"
                      />
                    </label>
                    <label className="text-xs uppercase tracking-[.1em] text-[#b99b76]">
                      Time
                      <select
                        required
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                        data-testid="select-reservation-time"
                        className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] outline-none focus:border-primary"
                      >
                        <option value="" disabled>
                          Select time
                        </option>
                        <option>7:00 PM</option>
                        <option>7:30 PM</option>
                        <option>8:00 PM</option>
                        <option>8:30 PM</option>
                        <option>9:00 PM</option>
                      </select>
                    </label>
                  </div>
                  <label className="block text-xs uppercase tracking-[.1em] text-[#b99b76]">
                    Guests
                    <select
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      data-testid="select-reservation-guests"
                      className="mt-2 w-full rounded-lg border border-[#704728] bg-[#160c08] px-3 py-3 text-sm normal-case tracking-normal text-[#f3e0be] outline-none focus:border-primary"
                    >
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5 guests</option>
                      <option>6+ guests</option>
                    </select>
                  </label>

                  <button
                    type="submit"
                    data-testid="button-submit-reservation"
                    className="w-full rounded-lg bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Request reservation
                  </button>
                  <p className="text-center text-xs text-[#876f57]">
                    For parties of 7 or more, please call us directly.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
