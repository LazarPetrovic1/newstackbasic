import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Control as ControlEntity } from "../entities/Control"
import { Item as ItemEntity } from "../entities/Item"
import { User as UserEntity } from "../entities/User"
import { Control } from "./interfaces/control.interface"
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ControlService {
  constructor(
    // private readonly userRepository: UsersRepository
    @InjectRepository(ControlEntity)
    private readonly controlRepository: EntityRepository<ControlEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: EntityRepository<ItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async create(control: Control) : Promise<ControlEntity> {
    console.log("LIKING", control);
    
    let vote : any;
    vote = await this.controlRepository.findOne({ id: control.id })
    if (!vote) vote = this.controlRepository.create(control)
    const user = await this.userRepository.findOne({ id: vote.user.id })
    const item = await this.itemRepository.findOne({ id: vote.item.id })
    if (!user.votes.isInitialized) await user.votes.init({ populate: [...Array.from(user.votes).map(vote => vote.id.toString()), vote.id.toString()] })
    if (!item.votes.isInitialized) await item.votes.init({ populate: [...Array.from(item.votes).map(vote => vote.id.toString()), vote.id.toString()] })
    console.log("JUZERENDAJTUM", { user, item });
    
    await this.itemRepository.persistAndFlush(item)
    await this.userRepository.persistAndFlush(user)
    console.log("JUZERAJTEMVOUT", { user, item, vote });
    await this.controlRepository.persistAndFlush(vote)
    return vote;
  }

  async getAllItemVotes(id: number) : Promise<ControlEntity[]> {
    const item = await this.itemRepository.findOne({ id })
    const votes = await this.controlRepository.findAll(item)
    return votes;
  }

  async getAllUserVotes(id: number) : Promise<ControlEntity[]> {
    const user = await this.userRepository.findOne({ id })
    const votes = await this.controlRepository.findAll(user)
    return votes;
  }

  async findOne(id: number) : Promise<ControlEntity> {
    const vote = await this.controlRepository.findOne({ id })
    return vote;
  }
  
  async update(id: number, control: Control) : Promise<ControlEntity> {
    const newControl = this.controlRepository.create(control)
    await this.controlRepository.nativeUpdate({ id }, newControl)
    return newControl;
  }

  async remove(id: number): Promise<ControlEntity> {
    const vote = await this.controlRepository.findOne({ id })
    await this.controlRepository.removeAndFlush(vote)
    return vote;
  }
}
