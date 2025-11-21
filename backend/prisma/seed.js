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
    }),
    prisma.user.upsert({
      where: { email: 'sarah.johnson@example.com' },
      update: {},
      create: {
        email: 'sarah.johnson@example.com',
        name: 'Sarah Johnson',
        password: userPassword,
        role: 'USER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'david.brown@example.com' },
      update: {},
      create: {
        email: 'david.brown@example.com',
        name: 'David Brown',
        password: userPassword,
        role: 'USER'
      }
    })
  ]);
  console.log('✅ Sample users created');

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Accounting' },
      update: {},
      create: { name: 'Accounting' }
    }),
    prisma.category.upsert({
      where: { name: 'Tax Filing' },
      update: {},
      create: { name: 'Tax Filing' }
    }),
    prisma.category.upsert({
      where: { name: 'Audit' },
      update: {},
      create: { name: 'Audit' }
    }),
    prisma.category.upsert({
      where: { name: 'Development' },
      update: {},
      create: { name: 'Development' }
    }),
    prisma.category.upsert({
      where: { name: 'Code Review' },
      update: {},
      create: { name: 'Code Review' }
    }),
    prisma.category.upsert({
      where: { name: 'Client Meeting' },
      update: {},
      create: { name: 'Client Meeting' }
    }),
    prisma.category.upsert({
      where: { name: 'Documentation' },
      update: {},
      create: { name: 'Documentation' }
    }),
    prisma.category.upsert({
      where: { name: 'Compliance' },
      update: {},
      create: { name: 'Compliance' }
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
      title: 'Prepare quarterly financial statements',
      description: 'Compile and review Q3 financial statements for ABC Corporation',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[0].id,
      categoryIds: [categories[0].id, categories[6].id]
    },
    {
      title: 'GST return filing for clients',
      description: 'File GST returns for 5 corporate clients before deadline',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[0].id,
      categoryIds: [categories[1].id, categories[7].id]
    },
    {
      title: 'Annual audit report submission',
      description: 'Complete and submit annual audit report for XYZ Ltd',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[0].id,
      categoryIds: [categories[2].id]
    },
    {
      title: 'Implement payment gateway integration',
      description: 'Integrate Stripe payment gateway in e-commerce platform',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[1].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Review pull requests for authentication module',
      description: 'Code review for new JWT authentication implementation',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[1].id,
      categoryIds: [categories[4].id, categories[3].id]
    },
    {
      title: 'Fix production bug in user dashboard',
      description: 'Resolve critical bug affecting user data display',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[1].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Client consultation for tax planning',
      description: 'Meeting with client to discuss tax optimization strategies',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[2].id,
      categoryIds: [categories[5].id, categories[1].id]
    },
    {
      title: 'Database optimization and indexing',
      description: 'Optimize database queries and add proper indexes',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[2].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Complete API documentation',
      description: 'Document all REST API endpoints with examples',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[2].id,
      categoryIds: [categories[6].id, categories[3].id]
    },
    {
      title: 'Income tax return filing - Individual clients',
      description: 'Prepare and file ITR for 10 individual clients',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[3].id,
      categoryIds: [categories[1].id]
    },
    {
      title: 'Reconcile bank statements',
      description: 'Monthly bank reconciliation for corporate accounts',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[3].id,
      categoryIds: [categories[0].id]
    },
    {
      title: 'Setup CI/CD pipeline',
      description: 'Configure GitHub Actions for automated testing and deployment',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[4].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Conduct internal audit',
      description: 'Perform internal audit for compliance verification',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[4].id,
      categoryIds: [categories[2].id, categories[7].id]
    },
    {
      title: 'Update API documentation',
      description: 'Document new endpoints and update existing ones',
      status: 'TODO',
      dueDate: nextWeek,
      userId: admin.id,
      categoryIds: [categories[6].id, categories[3].id]
    },
    {
      title: 'Review team code submissions',
      description: 'Review and approve pending code submissions from team',
      status: 'DOING',
      dueDate: tomorrow,
      userId: admin.id,
      categoryIds: [categories[4].id]
    },
    {
      title: 'Prepare TDS returns',
      description: 'Compile and file TDS returns for Q2',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[0].id,
      categoryIds: [categories[1].id, categories[7].id]
    },
    {
      title: 'Client meeting - Financial advisory',
      description: 'Discuss investment portfolio and financial planning',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[2].id,
      categoryIds: [categories[5].id]
    },
    {
      title: 'Implement microservices architecture',
      description: 'Refactor monolithic application to microservices',
      status: 'DOING',
      dueDate: tomorrow,
      userId: users[1].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Write unit tests for new features',
      description: 'Add comprehensive unit tests for payment module',
      status: 'TODO',
      dueDate: nextWeek,
      userId: users[4].id,
      categoryIds: [categories[3].id]
    },
    {
      title: 'Compliance audit preparation',
      description: 'Prepare documents and reports for upcoming compliance audit',
      status: 'DONE',
      dueDate: yesterday,
      userId: users[3].id,
      categoryIds: [categories[7].id, categories[2].id]
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
  console.log('User 4: sarah.johnson@example.com / User@123');
  console.log('User 5: david.brown@example.com / User@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
