"use client";
import DashboardLayout from '@/components/layout/DashboarLayouts'
import ProductCatalog from '@/components/layout/ProductCatalog'
import React from 'react'

function CatalogPage() {
  return (
    <DashboardLayout>
<div>CatalogPage

    <ProductCatalog></ProductCatalog>
</div>
</DashboardLayout>
  )
}

export default CatalogPage