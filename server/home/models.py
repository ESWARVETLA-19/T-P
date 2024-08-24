from django.db import models

# Create your models here.


class Document(models.Model):
    document = models.FileField(upload_to="documents", blank=True, null=True)
    type = models.CharField(blank=True, null=True, max_length=225)

    def __str__(self):
        return self.document.name if self.document else "No document"

class JobApplication(models.Model):
    company_name = models.CharField(max_length=255)
    job_description = models.TextField()
    application_deadline = models.DateField()
    drive_date = models.DateField()
    job_application_link = models.URLField(max_length=200)

    def __str__(self):
        return self.company_name

