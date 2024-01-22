'use server';

import { navigateToUrl } from '@5minds/processcube_app_sdk/server';
import logger from '../../..//lib/server-logger';

export async function navigateHome(): Promise<void> {
  const homeUrl = process.env.NEXTAUTH_URL;

  logger.info({ url: homeUrl }, 'Navigate to Home');

  navigateToUrl("localhostz:3000");
}
