import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { requireService } from '@/content/services';
import { buildContentMetadata } from '@/lib/seo';

const service = requireService('meta-ads-management');

export const metadata: Metadata = buildContentMetadata(service.route, service);

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
