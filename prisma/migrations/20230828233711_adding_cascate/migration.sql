-- DropForeignKey
ALTER TABLE "users_classes" DROP CONSTRAINT "users_classes_class_id_fkey";

-- DropForeignKey
ALTER TABLE "users_classes" DROP CONSTRAINT "users_classes_user_id_fkey";

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_classes" ADD CONSTRAINT "users_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
