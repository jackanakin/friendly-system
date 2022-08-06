import datetime
from typing import List, Dict
try:
    from django.utils import simplejson as json
except ImportError:
    import json

import app._services.integration.mk.MkCpeIntegrationService as MkCpeIntegrationService
import app._services.integration.mk.MkPhoneSubscriberIntegrationService as MkPhoneSubscriberIntegrationService


def run():
    MkCpeIntegrationService.run()
    MkPhoneSubscriberIntegrationService.run()
    
    return