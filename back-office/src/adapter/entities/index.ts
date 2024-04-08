import { Billing } from './orders/billing.entity';
import { CheckList } from './orders/check-list.entity';
import { GuestHouse } from './orders/guest-house.entity';
import { H2ousim } from './orders/h2ousim.entity';
import { JfkOneway } from './orders/jfk-oneway.entity';
import { JfkShuttleRt } from './orders/jfk-shuttle-rt.entity';
import { LineItemMetadata } from './orders/line-item-metadata.entity';
import { LineItem } from './orders/line-item.entity';
import { OrderMetadata } from './orders/order-metadata.entity';
import { Order } from './orders/order.entity';
import { Payment } from './orders/payment.entity';
import { Shipping } from './orders/shipping.entity';
import { SnapInfo } from './orders/snap-info.entity';
import { TourInfo } from './orders/tour-info.entity';
import { Tour } from './orders/tour.entity';
import { UsimInfo } from './orders/usim-info.entity';

import { ProductAttribute } from './products/attribute.entity';
import { ProductCategoryImage } from './products/category-image.entity';
import { ProductCategory } from './products/category.entity';
import { ProductImage } from './products/product-image.entity';
import { ProductType } from './products/product-type.entity';
import { Product } from './products/product.entity';
import { ProductTag } from './products/tag.entity';

export default [
  // Order
  Billing,
  CheckList,
  GuestHouse,
  H2ousim,
  JfkOneway,
  JfkShuttleRt,
  LineItem,
  LineItemMetadata,
  Order,
  OrderMetadata,
  Payment,
  Shipping,
  SnapInfo,
  Tour,
  TourInfo,
  UsimInfo,
  // Product
  Product,
  ProductImage,
  ProductTag,
  ProductAttribute,
  ProductCategory,
  ProductCategoryImage,
  // Adapter-Product
  ProductType,
];
