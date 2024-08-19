from django.db import models

# Create your models here.


class Document(models.Model):
    document = models.FileField(upload_to="documents", blank=True, null=True)
    type = models.CharField(blank=True, null=True, max_length=225)

    def __str__(self):
        return self.document.name if self.document else "No document"
