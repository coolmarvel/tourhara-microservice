import { Tour } from './tour.entity';
import { Order } from './order.entity';
import { Billing } from './billing.entity';
import { H2ousim } from './h2ousim.entity';
import { Payment } from './payment.entity';
import { LineItem } from './line-item.entity';
import { Shipping } from './shipping.entity';
import { SnapInfo } from './snap-info.entity';
import { TourInfo } from './tour-info.entity';
import { UsimInfo } from './usim-info.entity';
import { JfkOneway } from './jfk-oneway.entity';
import { CheckList } from './check-list.entity';
import { GuestHouse } from './guest-house.entity';
import { JfkShuttleRt } from './jfk-shuttle-rt.entity';
import { OrderMetadata } from './order-metadata.entity';
import { LineItemMetadata } from './line-item-metadata.entity';

export default [Billing, Shipping, GuestHouse, H2ousim, UsimInfo, SnapInfo, LineItem, LineItemMetadata, Order, OrderMetadata, Payment, Tour, TourInfo, JfkOneway, JfkShuttleRt, CheckList];
