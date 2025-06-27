import { Module } from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { PrismaService } from "./database/prisma.service";
import { CustomerService } from "./services/customer.service";
import { AccommodationService } from "./services/accomodation.service";
import { AccomodationController } from "./controllers/accomodation.controller";
import { HostingService } from "./services/hosting.service";
import { HostingController } from "./controllers/hosting.controller";

@Module({
	imports: [],
	controllers: [CustomerController, AccomodationController, HostingController],
	providers: [
		PrismaService,
		CustomerService,
		AccommodationService,
		HostingService,
	],
})
export class AppModule {}
