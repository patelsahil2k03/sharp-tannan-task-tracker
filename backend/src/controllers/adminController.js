import prisma from '../config/database.js';

export const getAllTasks = async (req, res) => {
  try {
    const { userId, status, dueDateFrom, dueDateTo } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (status) {
      where.status = status;
    }

    if (dueDateFrom || dueDateTo) {
      where.dueDate = {};
      if (dueDateFrom) {
        where.dueDate.gte = new Date(dueDateFrom);
      }
      if (dueDateTo) {
        where.dueDate.lte = new Date(dueDateTo);
      }
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        categories: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({
      where: { role: 'USER' }
    });

    const totalTasks = await prisma.task.count();

    const tasksByStatus = await prisma.task.groupBy({
      by: ['status'],
      _count: true
    });

    const totalCategories = await prisma.category.count();

    const overdueTasks = await prisma.task.count({
      where: {
        dueDate: {
          lt: new Date()
        },
        status: {
          not: 'DONE'
        }
      }
    });

    res.json({
      totalUsers,
      totalTasks,
      totalCategories,
      overdueTasks,
      tasksByStatus: tasksByStatus.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {})
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
