import { Billing } from './billing.entity';
import { CheckList } from './check-list.entity';
import { GuestHouse } from './guest-house.entity';
import { H2ousim } from './h2ousim.entity';
import { JfkOneway } from './jfk-oneway.entity';
import { JfkShuttleRt } from './jfk-shuttle-rt.entity';
import { LineItemMetadata } from './line-item-metadata.entity';
import { LineItem } from './line-item.entity';
import { OrderMetadata } from './order-metadata.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';
import { Shipping } from './shipping.entity';
import { SnapInfo } from './snap-info.entity';
import { TourInfo } from './tour-info.entity';
import { Tour } from './tour.entity';
import { UsimInfo } from './usim-info.entity';

import { Product } from './product.entity';
import { Tag } from './tag.entity';
import { ProductImage } from './product-image.entity';
import { Type } from './type.entity';
import { Category } from './category.entity';
import { CategoryImage } from './category-image.entity';
import { Attribute } from './attribute.entity';

export default [
  Product,
  Tag,
  ProductImage,
  Type,
  Category,
  CategoryImage,
  Attribute,
  Billing,
  Shipping,
  GuestHouse,
  H2ousim,
  UsimInfo,
  SnapInfo,
  LineItem,
  LineItemMetadata,
  Order,
  OrderMetadata,
  Payment,
  Tour,
  TourInfo,
  JfkOneway,
  JfkShuttleRt,
  CheckList,
];
