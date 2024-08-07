import { LineItemMetadata } from './line-item-metadata.entity';
import { OrderMetadata } from './order-metadata.entity';
import { JfkShuttleRt } from './jfk-shuttle-rt.entity';
import { GuestHouse } from './guest-house.entity';
import { JfkOneway } from './jfk-oneway.entity';
import { LineItem } from './line-item.entity';
import { SnapInfo } from './snap-info.entity';
import { TourInfo } from './tour-info.entity';
import { UsimInfo } from './usim-info.entity';
import { Shipping } from './shipping.entity';
import { H2oUsim } from './h2o-usim.entity';
import { Billing } from './billing.entity';
import { Payment } from './payment.entity';
import { Order } from './order.entity';
import { Tour } from './tour.entity';

export default [Billing, GuestHouse, H2oUsim, JfkOneway, JfkShuttleRt, LineItem, LineItemMetadata, Order, OrderMetadata, Payment, Shipping, SnapInfo, TourInfo, Tour, UsimInfo];
