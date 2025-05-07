const { gql } = require("apollo-server");

const typeDefs = gql`
  type Employee {
    emp_id: Int!
    birth_date: String!
    first_name: String!
    last_name: String!
    gender: String!
    hire_date: String!
    salaries: [Salary]
    dept_emp: [DeptEmp]
    dept_manager: [DeptManager]
    titles: [Title]
  }

  type Department {
    dept_id: Int!
    dept_name: String!
  }

  type Salary {
    emp_id: Int!
    salary: Int!
    from_date: String!
    to_date: String!
  }

  type Title {
    emp_id: Int!
    title: String!
    from_date: String!
    to_date: String!
  }

  type DeptEmp {
    emp_id: Int!
    dept_id: Int!
    from_date: String!
    to_date: String!
  }

  type DeptManager {
    emp_id: Int!
    dept_id: Int!
    from_date: String!
    to_date: String!
  }

  type Query {
    employees: [Employee]
    employee(emp_id: Int!): Employee
    departments: [Department]
    department(dept_id: Int!): Department
    salaries: [Salary]
    titles: [Title]
    deptEmp: [DeptEmp]
    deptManagers: [DeptManager]
  }

  type Mutation {
  createEmployee(
    birth_date: String!
    first_name: String!
    last_name: String!
    gender: String!
    hire_date: String!
  ): Employee

  updateEmployee(
    emp_id: Int!
    birth_date: String
    first_name: String
    last_name: String
    gender: String
    hire_date: String
  ): Employee

  deleteEmployee(emp_id: Int!): Employee

  createDepartment(
    dept_name: String!
  ): Department

  createSalary(
    emp_id: Int!
    salary: Int!
    from_date: String!
    to_date: String!
  ): Salary

  updateSalary(
    emp_id: Int!
    salary: Int!
    from_date: String!
    to_date: String!
  ): Salary

  deleteSalary(
    emp_id: Int!
  ): Salary

  createTitle(
    emp_id: Int!
    title: String!
    from_date: String!  
    to_date: String!
  ): Title

  assignEmployeeToDepartment(
    emp_id: Int!
    dept_id: Int!
    from_date: String!
    to_date: String!
  ): DeptEmp

  assignManagerToDepartment(
    emp_id: Int!
    dept_id: Int!
    from_date: String!
    to_date: String!
  ): DeptManager
}

`;

module.exports = typeDefs;
