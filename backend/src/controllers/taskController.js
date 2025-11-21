import prisma from '../config/database.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, categoryIds, priority } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and due date are required' });
    }

    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority: priority || 'MEDIUM',
      userId: req.user.id
    };

    if (categoryIds && categoryIds.length > 0) {
      taskData.categories = {
        connect: categoryIds.map(id => ({ id }))
      };
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        categories: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      include: {
        categories: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        categories: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate, categoryIds, priority } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (existingTask.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (status && status !== existingTask.status) {
      const now = new Date();
      const taskDueDate = new Date(existingTask.dueDate);
      
      if (now > taskDueDate) {
        return res.status(400).json({ error: 'Cannot change status after due date' });
      }
    }

    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (priority !== undefined) updateData.priority = priority;

    if (categoryIds !== undefined) {
      updateData.categories = {
        set: [],
        connect: categoryIds.map(id => ({ id }))
      };
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        categories: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
