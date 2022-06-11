-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_classes" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_class" TEXT NOT NULL,

    CONSTRAINT "users_classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
