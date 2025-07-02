import { Args, Query, Resolver } from "@nestjs/graphql";
import { StreamService } from "./stream.service";
import { StreamModel } from "@/src/modules/stream/models/stream.model";
import { FiltersInput } from "./inputs/filters.input";

@Resolver("Stream")
export class StreamResolver {
  public constructor(private readonly streamService: StreamService) {}

  @Query(() => [StreamModel], { name: "findAllStreams" })
  public async findAll(@Args("filters") input: FiltersInput) {
    return this.streamService.findAll(input);
  }

  @Query(() => [StreamModel], { name: "findRandomStreams" })
  public async findRandom() {
    return this.streamService.findRandom();
  }
}
