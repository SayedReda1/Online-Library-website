# Generated by Django 4.2.13 on 2024-06-19 05:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('OnlineLibrary', '0006_alter_book_cover_alter_user_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='publisher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='OnlineLibrary.user'),
        ),
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='OnlineLibrary.photo'),
        ),
    ]