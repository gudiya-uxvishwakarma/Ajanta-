import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const defaultSettings = {
  websiteTitle: 'Ajanta',
  contactEmail: 'info@ajanta.com',
  contactPhone: '+91 9876543210',
  freeShippingThreshold: 999,
};

// Simple module-level cache so all components share one fetch
let cachedSettings = null;
let fetchPromise = null;

export function useWebsiteSettings() {
  const [settings, setSettings] = useState(cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = axios
        .get(API_ENDPOINTS.publicWebsiteSettings)
        .then((res) => {
          const s = res.data.settings || {};
          cachedSettings = {
            websiteTitle: s.websiteTitle || defaultSettings.websiteTitle,
            contactEmail: s.contactEmail || defaultSettings.contactEmail,
            contactPhone: s.contactPhone || defaultSettings.contactPhone,
            freeShippingThreshold: s.freeShippingThreshold || defaultSettings.freeShippingThreshold,
          };
          return cachedSettings;
        })
        .catch(() => {
          fetchPromise = null; // allow retry on next mount
          return defaultSettings;
        });
    }

    fetchPromise.then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
