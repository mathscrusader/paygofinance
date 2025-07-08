import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample plans
  const premium = await prisma.plan.upsert({
    where: { name: "Premium" },
    update: {},
    create: {
      name: "Premium",
      description: "Premium plan with all features",
      price: 5000,
    },
  });

  const basic = await prisma.plan.upsert({
    where: { name: "Basic" },
    update: {},
    create: {
      name: "Basic",
      description: "Basic free plan",
      price: 0,
    },
  });

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      name: "John",
      password: "testpassword",
      planId: premium.id,
    },
  });

  // Create some transactions for that user
  await prisma.transaction.createMany({
    data: [
      {
        type: "Airtime",
        amount: -500,
        status: "Completed",
        network: "MTN",
        userId: user.id,
      },
      {
        type: "Data",
        amount: -1200,
        status: "Completed",
        network: "Airtel",
        userId: user.id,
      },
      {
        type: "ReferralBonus",
        amount: 100,
        status: "Completed",
        network: "Bonus",
        userId: user.id,
      },
      {
        type: "TokenPurchase",
        amount: 5000,
        status: "Completed",
        network: "Premium Package",
        userId: user.id,
      },
    ],
  });

  // Create airtime networks and their rates
  const networksData = [
    {
      name: "MTN",
      color: "bg-yellow-500",
      rates: [
        { amount: 100, discount: 3 },
        { amount: 200, discount: 4 },
        { amount: 500, discount: 5 },
        { amount: 1000, discount: 6 },
      ],
    },
    {
      name: "Airtel",
      color: "bg-red-500",
      rates: [
        { amount: 100, discount: 2 },
        { amount: 200, discount: 3 },
        { amount: 500, discount: 4 },
        { amount: 1000, discount: 5 },
      ],
    },
    {
      name: "Glo",
      color: "bg-green-500",
      rates: [
        { amount: 100, discount: 3 },
        { amount: 200, discount: 3 },
        { amount: 500, discount: 4 },
        { amount: 1000, discount: 6 },
      ],
    },
    {
      name: "9mobile",
      color: "bg-emerald-500",
      rates: [
        { amount: 100, discount: 1 },
        { amount: 200, discount: 2 },
        { amount: 500, discount: 3 },
        { amount: 1000, discount: 4 },
      ],
    },
  ];

  for (const net of networksData) {
    const network = await prisma.network.upsert({
      where: { name: net.name },
      update: {},
      create: {
        name: net.name,
        color: net.color,
      },
    });

    for (const rate of net.rates) {
      await prisma.rate.create({
        data: {
          amount: rate.amount,
          discount: rate.discount,
          networkId: network.id,
        },
      });
    }
  }

  console.log("Database seeded.");

  // --- New: demo DataPlan seed ---

  const dataBundles = [
    {
      networkName: "MTN",
      plans: [
        { size: "1GB", duration: "30 days", price: 300,  originalPrice: 350 },
        { size: "2GB", duration: "30 days", price: 500,  originalPrice: 600 },
        { size: "5GB", duration: "30 days", price: 1200, originalPrice: 1500 },
        { size: "10GB", duration: "30 days", price: 2000, originalPrice: 2500 },
      ],
    },
    {
      networkName: "Airtel",
      plans: [
        { size: "1GB", duration: "30 days", price: 280,  originalPrice: 330 },
        { size: "2GB", duration: "30 days", price: 480,  originalPrice: 580 },
        { size: "5GB", duration: "30 days", price: 1150, originalPrice: 1400 },
        { size: "10GB", duration: "30 days", price: 1900, originalPrice: 2300 },
      ],
    },
    {
      networkName: "Glo",
      plans: [
        { size: "1GB", duration: "30 days", price: 250,  originalPrice: 300 },
        { size: "2GB", duration: "30 days", price: 450,  originalPrice: 550 },
        { size: "5GB", duration: "30 days", price: 1100, originalPrice: 1350 },
        { size: "10GB", duration: "30 days", price: 1800, originalPrice: 2200 },
      ],
    },
    {
      networkName: "9mobile",
      plans: [
        { size: "1GB", duration: "30 days", price: 320,  originalPrice: 380 },
        { size: "2GB", duration: "30 days", price: 460,  originalPrice: 560 },
        { size: "5GB", duration: "30 days", price: 1120, originalPrice: 1380 },
        { size: "10GB", duration: "30 days", price: 1850, originalPrice: 2250 },
      ],
    },
  ];

  for (const bundle of dataBundles) {
    const net = await prisma.network.findUnique({
      where: { name: bundle.networkName },
    });
    if (!net) continue;

    for (const plan of bundle.plans) {
      await prisma.dataPlan.upsert({
        where: { id: `${plan.size}-${net.id}` }, // demo unique key
        update: {},
        create: {
          size:          plan.size,
          duration:      plan.duration,
          price:         plan.price,
          originalPrice: plan.originalPrice,
          networkId:     net.id,
        },
      });
    }
  }

  console.log("Database seeded with data plans.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
