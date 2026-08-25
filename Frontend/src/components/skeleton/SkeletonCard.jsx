import { Skeleton } from "antd";
import React from "react";

const SkeletonCard = ({index}) => {
  return (
    <article
      key={`featured-product-skeleton-${index}`}
      aria-label="Đang tải sản phẩm"
      className="overflow-hidden rounded-[3px] bg-white"
    >
      <Skeleton.Image
        active
        style={{ width: "100%", height: 255 }}
        className="!flex !h-[255px] !w-full"
      />
      <div className="flex min-h-[126px] flex-col px-3 py-3">
        <Skeleton
          active
          title={{ width: "85%" }}
          paragraph={{ rows: 1, width: "45%" }}
        />
        <div className="mt-auto flex items-center justify-between pt-3">
          <Skeleton.Input active size="small" className="!w-16" />
          <Skeleton.Button active size="small" shape="circle" />
        </div>
      </div>
    </article>
  );
};

export default SkeletonCard;
