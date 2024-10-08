# Generated by Django 5.0.1 on 2024-08-26 11:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_jobapplication'),
        ('user', '0006_remove_user_attempted_alter_user_reg_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='job_application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='home.jobapplication'),
        ),
        migrations.AlterField(
            model_name='user',
            name='documents',
            field=models.ManyToManyField(related_name='user', to='home.document'),
        ),
    ]
