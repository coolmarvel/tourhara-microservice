import { Tour } from './tour.entity';
import { Order } from './order.entity';
import { Billing } from './billing.entity';
import { Payment } from './payment.entity';
import { H2oUsim } from './h2o-usim.entity';
import { Shipping } from './shipping.entity';
import { SnapInfo } from './snap-info.entity';
import { TourInfo } from './tour-info.entity';
import { UsimInfo } from './usim-info.entity';
import { LineItem } from './line-item.entity';
import { JfkOneway } from './jfk-oneway.entity';
import { GuestHouse } from './guest-house.entity';
import { JfkShuttleRt } from './jfk-shuttle-rt.entity';
import { OrderMetadata } from './order-metadata.entity';
import { LineItemMetadata } from './line-item-metadata.entity';

export default [Billing, GuestHouse, Order, H2oUsim, UsimInfo, JfkOneway, JfkShuttleRt, LineItem, LineItemMetadata, Order, OrderMetadata, Payment, Shipping, SnapInfo, Tour, TourInfo];
