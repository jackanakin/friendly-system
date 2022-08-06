from django.core.management.base import BaseCommand, CommandError
import app._services.integration.FiberhomeIntegrationService as FiberhomeIntegrationService

class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write('extracting fiberhome data by snmp')
        FiberhomeIntegrationService.run()
        self.stdout.write('finished extracting fiberhome data by snmp')

        return