<template>
  <div class="tickets">
    <div 
        v-if="tickets.length"
    >
        <div 
            v-for="(ticket, index) in tickets"
            :key="index"
            class="ticket"
        >
            <div class="ticket__header">
                <div class="ticket__price">
                    {{ formatPrice(String(ticket.price)) }} Р
                </div>
                <div class="ticket__carrier">
                    <img 
                        :src="`https://pics.avs.io/99/36/${ticket.carrier}.png`"
                        alt="carrier"
                    >
                </div>
            </div>
            <div class="ticket__info-wrap">
                <div 
                    v-for="(ticketInfo, index) in ticket.segments"
                    :key="index"
                    class="ticket__info"
                >
                    <div 
                        class="ticket__info-item"
                    >
                        <div class="ticket__info-item-title ticket__info-item-direction">
                            <div class="ticket__info-item-details">
                                {{ ticketInfo.origin }}
                            </div>
                            <span class="ticket__info-item-devider">-</span>
                            <div class="ticket__info-item-details">
                                {{ ticketInfo.destination }}
                            </div>
                        </div>
                        <div class="ticket__info-item-direction">
                            <div class="ticket__info-item-details">
                                {{ convertDate(ticketInfo.date) }}
                            </div>
                            <span class="ticket__info-item-devider">-</span>
                            <div class="ticket__info-item-details">
                                {{ calcEndDate(ticketInfo.date, ticketInfo.duration) }}
                            </div>
                        </div>
                    </div>
                    <div 
                        class="ticket__info-item"
                    >
                        <div class="ticket__info-item-title">
                            <div class="ticket__info-item-details">
                                {{ $t('tickets.duration') }}
                            </div>
                        </div>
                        <div class="ticket__info-item-block">
                            <div class="ticket__info-item-details">
                                {{ convertDuration(ticketInfo.duration) }}
                            </div>
                        </div>
                    </div>
                    <div 
                        class="ticket__info-item"
                    >
                        <div 
                            v-if="ticketInfo.stops.length"
                        >
                            <div class="ticket__info-item-title">
                                <div class="ticket__info-item-details">
                                   {{ ticketInfo.stops.length }} {{ stopsTranslation(ticketInfo.stops.length) }}
                                </div>
                            </div>
                            <div class="ticket__info-item-stops">
                                <div 
                                    v-for="(stop, index) in ticketInfo.stops"
                                    :key="index"
                                    class="ticket__info-item-details"
                                >
                                   <span>{{ stop }}</span>
                                </div>
                            </div>
                        </div>
                        <div 
                            v-else
                            class="ticket__info-item-title"
                        >
                            <div class="ticket__info-item-details">
                                {{ $t('tickets.withoutStops') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div 
        v-else
        class="tickets__empty"
    >
        {{ $t('tickets.emptyList') }}
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TicketInterface from "@/interfaces/ticket";
import { TranslateResult } from 'vue-i18n';
import moment from 'moment';

@Component
export default class Tickets extends Vue {
  @Prop({ type: Array, default: [] }) tickets!: TicketInterface[];

  formatPrice(price: string): string {
      return price.slice(0, price.length-3) + ' ' + price.slice(2);
  }

  convertDate(date: string): string {
      return moment(date).utc().format('HH:mm');
  }

  calcEndDate(date: string, duration: number): string {
    const endDate = moment(date).valueOf() + (duration * 60000 );
      return moment(endDate).utc().format('HH:mm');
  }

  convertDuration(duration: number): string {
    const hours = Math.floor(duration / 60);          
    const minutes = duration % 60;
    return `${hours }${this.$t('tickets.hours')} ${minutes}${this.$t('tickets.minutes')}`;

  }

  stopsTranslation(stops: number): TranslateResult | undefined {
      if (stops > 1) {
          return this.$t('tickets.stops');
      }
      return this.$t('tickets.stop');
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars.scss";
.tickets {
    &__empty {
        font-size: .75rem;
        font-weight: bold;
    }
}
.ticket {
    padding: $offset * 2;
    background: $baseWhite;
    border-radius: $defaultRadius;
    @include boxShadow;
    margin-bottom: $offset * 2;
    @media (max-width: 500px) {
       padding-bottom: 0;
    }
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $offset * 2;
    }
    &__price {
        font-size: 1.5rem;
        font-weight: 600;
        color: $baseBlue;
    }
    &__info {
        margin-bottom: $offset * 1.5;
        display: flex;
        @media (max-width: 500px) {
           display: block;
           width: 50%;
        }
        &:last-child {
            margin-bottom: 0;
        }
        &-wrap {
            @media (max-width: 500px) {
                display: flex;
            }
        }
    }
    &__info-item {
        padding-right: $offset;
        width: 33.33%;
        @media (max-width: 500px) {
            width: 100%;
            margin-bottom: $offset;
        }
        &:last-child {
            padding-right: 0;
        }
        &-direction {
            display: flex;
        }
        &-stops {
            display: flex;
            align-items: center;
            .ticket__info-item-details:last-child{
                span:after {
                    display: none;
                }
            }
            span {
                &:after {
                    content: ',';
                }
            }
        }
        &-devider {
            padding: 0 $offset * .3;
        }
        &-title {
            margin-bottom: $offset * .2;
            font-weight: 600;
            font-size: .75rem;
            color: $secondaryGray;
            text-transform: uppercase;
            .ticket__info-item-details {
                font-size: .75rem;
            }
        }
        &-details {
            font-weight: 600;
            font-size: .875rem;
        }
    }
}
</style>