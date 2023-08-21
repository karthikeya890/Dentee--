import "./services.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const ServicesSkeleton = () => {
  return (
    <div className="container-fluid p-0">
      <header className="header">
        <Skeleton width={120} height={50} />
        <div className="d-flex align-items-center">
          <Skeleton width={100} height={50} />
          <Skeleton className="ms-4" circle="true" width={50} height={50} />
        </div>
      </header>
      <main className="container-fluid d-flex flex-column align-items-center">
        <Skeleton height={20} width={100} className="services-heading" />
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
              <Skeleton height={200} width={200} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
              <Skeleton height={200} width={200} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
              <Skeleton height={200} width={200} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3 my-4 my-lg-0 d-flex flex-column align-items-center justify-content-center">
              <Skeleton height={200} width={200} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesSkeleton;
