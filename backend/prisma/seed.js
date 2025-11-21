import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const userPassword = await bcrypt.hash('User@123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sharpandtannan.com' },
    update: {},
    create: {
      email: 'admin@sharpandtannan.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log('✅ Admin user created');

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: userPassword,
        role: 'USER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        password: userPassword,
        role: 'USER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'mike.wilson@example.com' },
      update: {},
      create: {
        email: 'mike.wilson@example.com',
        name: 'Mike Wilson',
        password: userPassword,
        role: 'USER'
      }
    })
  ]);
  console.log('✅ Sample users created');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Work' },
      update: {},
      create: { name: 'Work' }
    }),
    prisma.category.upsert({
      where: { name: 'Personal' },
      update: {},
      create: { name: 'Personal' }
    }),
    prisma.category.upsert({
      where: { name: 'Urgent' },
      update: {},
      create: { name: 'Urgent' }
    }),
    prisma.category.upsert({
      where: { name: 'Meeting' },
      update: {},
      create: { name: 'Meeting' }
    }),
    prisma.category.upsert({
      where: { name: 'Development' },
      update: {},
      create: { name: 'Development' }
    }),
    prisma.category.upsert({
      where: { name: 'Design' },
      update: {},
      create: { name: 'Design' }
    })
  ]);
  console.log('✅ Categories created');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tasks = [
    {
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task tracker project',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[0].id,
      categoryIds: [categories[0].id, categories[4].id]
    },
    {
      title: 'Review pull requests',
      description: 'Review and merge pending pull requests from team members',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[0].id,
      categoryIds: [categories[0].id, categories[2].id]
    },
    {
      title: 'Team standup meeting',
      description: 'Daily standup with development team',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[0].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Design new landing page',
      description: 'Create mockups for the new landing page design',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[1].id,
      categoryIds: [categories[0].id, categories[5].id]
    },
    {
      title: 'Update user profile UI',
      description: 'Improve the user profile interface with new design',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[1].id,
      categoryIds: [categories[5].id, categories[2].id]
    },
    {
      title: 'Fix authentication bug',
      description: 'Resolve the login issue reported by users',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[1].id,
      categoryIds: [categories[0].id, categories[4].id]
    },
    {
      title: 'Prepare presentation slides',
      description: 'Create slides for client presentation next week',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[2].id,
      categoryIds: [categories[0].id, categories[3].id]
    },
    {
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[2].id,
      categoryIds: [categories[0].id, categories[4].id, categories[2].id]
    },
    {
      title: 'Code review session',
      description: 'Conduct code review with junior developers',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[2].id,
      categoryIds: [categories[0].id]
    },
    {
      title: 'Grocery shopping',
      description: 'Buy groceries for the week',
      status: 'TODO',
      dueDate: tomorrow,
      userId: users[0].id,
      categoryIds: [categories[1].id]
    },
    {
      title: 'Gym workout',
      description: 'Evening workout session at the gym',
      status: 'TODO',
      dueDate: today,
      userId: users[1].id,
      categoryIds: [categories[1].id]
    },
    {
      title: 'Read technical book',
      description: 'Continue reading "Clean Code" by Robert Martin',
      status: 'DOING',
      dueDate: nextWeek,
      userId: users[2].id,
      categoryIds: [categories[1].id]
    }
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        userId: task.userId,
        categories: {
          connect: task.categoryIds.map(id => ({ id }))
        }
      }
    });
  }
  console.log('✅ Sample tasks created');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Sample Credentials:');
  console.log('Admin: admin@sharpandtannan.com / Admin@123');
  console.log('User 1: john.doe@example.com / User@123');
  console.log('User 2: jane.smith@example.com / User@123');
  console.log('User 3: mike.wilson@example.com / User@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
