from django.db import models

class PingCandidates(models.Model):
    description = models.CharField(max_length=100)
    address = models.CharField(max_length=50)
    grouping = models.CharField(max_length=20, null=True, blank=True)

    class Meta:
        db_table = "ping_candidates"