from django.core.management.base import BaseCommand, CommandError
import app.services.integration.MkIntegrationService as MkIntegrationService

class Command(BaseCommand):

    def handle(self, *args, **options):
        ## INTEGRATE ERP DATABASE
        self.stdout.write('Running ERP Integration')
        MkIntegrationService.run()
        self.stdout.write('Finished ERP Integration')

        ####
        return