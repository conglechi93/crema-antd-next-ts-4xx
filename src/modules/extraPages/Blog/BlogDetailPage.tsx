'use client';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';
import BlogDetail from './BlogDetail';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import type {
  BlogDetailType,
  BlogSidebarType,
} from '@crema/types/models/extrapages/Blog';

const BlogDetailPage = () => {
  const params = useParams();
  const [{ apiData, loading }, { setQueryParams }] = useGetDataApi<
    | {
        blogDetail: BlogDetailType;
        blogSidebar: BlogSidebarType;
      }
    | undefined
  >('blogs/detail', undefined, {}, false);

  useEffect(() => {
    if (params?.all?.[0]) setQueryParams({ id: params.all[0] });
    else setQueryParams({});
  }, [params.all]);

  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(apiData?.blogDetail) ? (
    <BlogDetail
      blogSidebar={apiData!.blogSidebar}
      blogDetail={apiData!.blogDetail}
    />
  ) : null;
};
export default BlogDetailPage;
