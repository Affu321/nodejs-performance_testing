-- CreateTable
CREATE TABLE "employees" (
    "emp_id" SERIAL NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "first_name" VARCHAR(14) NOT NULL,
    "last_name" VARCHAR(16) NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "salaries" (
    "emp_id" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "departments" (
    "dept_id" SERIAL NOT NULL,
    "dept_name" VARCHAR(40) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("dept_id")
);

-- CreateTable
CREATE TABLE "dept_emp" (
    "emp_id" INTEGER NOT NULL,
    "dept_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dept_emp_pkey" PRIMARY KEY ("emp_id","dept_id")
);

-- CreateTable
CREATE TABLE "dept_manager" (
    "emp_id" INTEGER NOT NULL,
    "dept_id" INTEGER NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dept_manager_pkey" PRIMARY KEY ("emp_id","dept_id")
);

-- CreateTable
CREATE TABLE "titles" (
    "emp_id" INTEGER NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("emp_id","title","from_date")
);

-- CreateIndex
CREATE UNIQUE INDEX "salaries_emp_id_key" ON "salaries"("emp_id");

-- AddForeignKey
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_emp" ADD CONSTRAINT "dept_emp_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_emp" ADD CONSTRAINT "dept_emp_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "departments"("dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_manager" ADD CONSTRAINT "dept_manager_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dept_manager" ADD CONSTRAINT "dept_manager_dept_id_fkey" FOREIGN KEY ("dept_id") REFERENCES "departments"("dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "titles" ADD CONSTRAINT "titles_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
