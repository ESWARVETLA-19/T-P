from django.core.management.base import BaseCommand
from user.models import User
from django.contrib.auth.hashers import make_password
import os
import pandas as pd


class Command(BaseCommand):
    help = "Create or update students with mock test data from multiple files"

    def add_arguments(self, parser):
        parser.add_argument(
            "directory", type=str, help="Directory containing mock test XLSX files"
        )

    def handle(self, *args, **options):
        directory = options["directory"]

        if not os.path.exists(directory):
            self.stdout.write(
                self.style.ERROR(f"The directory {directory} does not exist")
            )
            return

        students_created = 0
        students_updated = 0

        for filename in os.listdir(directory):
            if filename.endswith(".xlsx"):
                file_path = os.path.join(directory, filename)
                self.stdout.write(self.style.NOTICE(f"Processing file: {file_path}"))

                try:
                    data = pd.read_excel(file_path)
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f"Error reading file {filename}: {e}")
                    )
                    continue

                if data.empty:
                    self.stdout.write(
                        self.style.WARNING(f"The file {filename} is empty")
                    )
                    continue

                required_columns = [
                    "Name",
                    "Email",
                    "ID No.",
                    "Batch Year",
                    "Batch",
                    "Assessment Name",
                ]
                missing_columns = [
                    col for col in required_columns if col not in data.columns
                ]

                if missing_columns:
                    self.stdout.write(
                        self.style.ERROR(
                            f'Missing required columns in file {filename}: {", ".join(missing_columns)}'
                        )
                    )
                    continue

                for index, row in data.iterrows():
                    student, created = User.objects.get_or_create(
                        reg_no=row["ID No."],
                    )

                    if created:
                        student.username = row["Name"]
                        student.email = row["Email"]
                        student.batch_year = row["Batch Year"]
                        student.batch = row["Batch"]
                        student.password = make_password(row["ID No."])
                        student.is_student = True
                        student.tests = {'FULL_LENGTH_TESTS': []}   
                        student.save()
                        students_created += 1
                        self.stdout.write(
                            self.style.SUCCESS(
                                f"Student with ID {row['ID No.']} created"
                            )
                        )
                    else:
                        students_updated += 1
                        self.stdout.write(
                            self.style.WARNING(
                                f"Student with ID {row['ID No.']} updated"
                            )
                        )
                    dictionary = {}
                    mockname=row["Assessment Name"]
                    assessment_details = [
                                        "Assessment Name",
                                        "Status",
                                        "Time Spent",
                                        "Ques Count",
                                        "Attempted Ques",
                                        "Positive",
                                        "Negative",
                                        "Total",
                                        "Max Marks",
                                        "Percentage",
                                        "Qualified",
                                        "Accuracy",
                                        "Tab Switches",
                                        "Quant Percentage",
                                        "Reasoning Percentage",
                                        "Verbal Percentage",
                                        "Pseudo Code Percentage",
                                        "Technical Percentage",
                                        "Coding Percentage"
                                        ]
                    # Sections = [      
                    #                     # Quant Section
                    #                     "Quant Ques Count",
                    #                     "Quant Attempted Ques",
                    #                     "Quant Correct",
                    #                     "Quant Wrong",
                    #                     "Quant Positive",
                    #                     "Quant Negative",
                    #                     "Quant Total",
                    #                     "Quant Max Marks",
                    #                     "Quant Percentage",
                    #                     "Quant Qualified",
                    #                     "Quant Accuracy",
                                        
                    #                     # Reasoning Section
                    #                     "Reasoning Ques Count",
                    #                     "Reasoning Attempted Ques",
                    #                     "Reasoning Correct",
                    #                     "Reasoning Wrong",
                    #                     "Reasoning Positive",
                    #                     "Reasoning Negative",
                    #                     "Reasoning Total",
                    #                     "Reasoning Max Marks",
                    #                     "Reasoning Percentage",
                    #                     "Reasoning Qualified",
                    #                     "Reasoning Accuracy",
                                        
                    #                     # Verbal Section
                    #                     "Verbal Ques Count",
                    #                     "Verbal Attempted Ques",
                    #                     "Verbal Correct",
                    #                     "Verbal Wrong",
                    #                     "Verbal Positive",
                    #                     "Verbal Negative",
                    #                     "Verbal Total",
                    #                     "Verbal Max Marks",
                    #                     "Verbal Percentage",
                    #                     "Verbal Qualified",
                    #                     "Verbal Accuracy",
                                        
                    #                     # Pseudo Code Section
                    #                     "Pseudo Code Ques Count",
                    #                     "Pseudo Code Attempted Ques",
                    #                     "Pseudo Code Correct",
                    #                     "Pseudo Code Wrong",
                    #                     "Pseudo Code Positive",
                    #                     "Pseudo Code Negative",
                    #                     "Pseudo Code Total",
                    #                     "Pseudo Code Max Marks",
                    #                     "Pseudo Code Percentage",
                    #                     "Pseudo Code Qualified",
                    #                     "Pseudo Code Accuracy",
                                        
                    #                     # Technical Section
                    #                     "Technical Ques Count",
                    #                     "Technical Attempted Ques",
                    #                     "Technical Correct",
                    #                     "Technical Wrong",
                    #                     "Technical Positive",
                    #                     "Technical Negative",
                    #                     "Technical Total",
                    #                     "Technical Max Marks",
                    #                     "Technical Percentage",
                    #                     "Technical Qualified",
                    #                     "Technical Accuracy",
                                        
                    #                     # Coding Section
                    #                     "Coding Ques Count",
                    #                     "Coding Attempted Ques",
                    #                     "Coding Correct",
                    #                     "Coding Wrong",
                    #                     "Coding Positive",
                    #                     "Coding Negative",
                    #                     "Coding Total",
                    #                     "Coding Max Marks",
                    #                     "Coding Percentage",
                    #                     "Coding Qualified",
                    #                     "Coding Accuracy"
                    #                 ]
                    

                    if mockname not in dictionary:
                        dictionary[mockname] = {}
                        for i in assessment_details:
                            dictionary[mockname][i]=row[i]
                        
                        


                    print(dictionary)
                    if 'FULL_LENGTH_RESULTS' not in student.tests:
                        student.tests['FULL_LENGTH_RESULTS'] = []
                    student.tests['FULL_LENGTH_RESULTS'].append(dictionary)  
                    student.save()

        if students_created > 0:
            self.stdout.write(
                self.style.SUCCESS(f"{students_created} students added successfully")
            )

        if students_updated > 0:
            self.stdout.write(
                self.style.SUCCESS(f"{students_updated} students updated successfully")
            )

        if students_created == 0 and students_updated == 0:
            self.stdout.write(self.style.WARNING("No students were added or updated"))
