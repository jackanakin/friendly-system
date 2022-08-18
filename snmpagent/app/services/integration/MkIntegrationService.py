import datetime
from typing import List, Dict
try:
    from django.utils import simplejson as json
except ImportError:
    import json

import app.services.integration.mk.MkCpeIntegrationService as MkCpeIntegrationService


def run():
    MkCpeIntegrationService.run()
    
    return