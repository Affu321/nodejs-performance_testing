const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    employees: async () => {
      return await prisma.employees.findMany({
        include: { salaries: true, dept_emp: true, dept_manager: true, titles: true }
      });
    },
    employee: async (_, { emp_id }) => {
      return await prisma.employees.findUnique({ where: { emp_id }, include: { salaries: true, dept_emp: true, dept_manager: true, titles: true } });
    },
    departments: async () => await prisma.departments.findMany(),
    department: async (_, { dept_id }) => await prisma.departments.findUnique({ where: { dept_id } }),
    salaries: async () => await prisma.salaries.findMany(),
    titles: async () => await prisma.titles.findMany(),
    deptEmp: async () => await prisma.dept_emp.findMany(),
    deptManagers: async () => await prisma.dept_manager.findMany(),
  },
  
  Mutation: {
    createEmployee: async (_, args) => {
      return await prisma.employees.create({
        data: { ...args, birth_date: new Date(args.birth_date), hire_date: new Date(args.hire_date) }
      });
    },
    updateEmployee: async (_, args) => {
      const { emp_id, ...updates } = args;
      return await prisma.employees.update({ where: { emp_id }, data: updates });
    },
    deleteEmployee: async (_, { emp_id }) => {
      return await prisma.employees.delete({ where: { emp_id } });
    },
    createDepartment: async (_, args) => {
      return await prisma.departments.create({ data: args });
    },
    createSalary: async (_, { emp_id, salary, from_date, to_date }) => {
      return await prisma.salaries.create({
        data: { emp_id, salary, from_date: new Date(from_date), to_date: new Date(to_date) }
      });
    },    
    updateSalary: async (_, { emp_id, from_date, salary, to_date }) => {
      return await prisma.salaries.update({
        where: {
          emp_id_from_date: {
            emp_id,
            from_date: new Date(from_date)
          }
        },
        data: {
          salary,
          to_date: new Date(to_date)
        }
      });
    },
    
    deleteSalary: async (_, { emp_id, title}) => {
      return await prisma.salaries.delete({ where: {emp_id, title}
      });
    },   
    createTitle: async (_, { emp_id, title, from_date, to_date }) => {
      return await prisma.titles.create({
        data: {
          emp_id,
          title,
          from_date: new Date(from_date), 
          to_date: new Date(to_date) 
        }
      });
    },
    
    
    assignEmployeeToDepartment: async (_, { emp_id, dept_id, from_date, to_date }) => {
      return await prisma.dept_emp.create({
        data: {
          emp_id,
          dept_id,
          from_date: new Date(from_date), 
          to_date: new Date(to_date) 
        }
      });
    },
    assignManagerToDepartment: async (_, args) => {
      return await prisma.dept_manager.create({ data: args });
    },
  },
};

module.exports = resolvers;