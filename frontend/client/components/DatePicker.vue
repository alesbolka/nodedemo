<template>
  <div class="datepicker">
    <!-- Day -->
    <dropdown class="pull-left" v-bind:title="dayText">
      <li class="pointer"
        v-for="ii in maxDay"
        @click="setDay(ii)"
      >
        <a>
          {{ ii }}
        </a>
      </li>
    </dropdown>
    <!-- Month -->
    <dropdown class="pull-left" v-bind:title="monthText">
      <li class="pointer"
        v-for="(month, ii) in months"
        @click="setMonth(ii)"
      >
        <a>
          {{ month.long }}
        </a>
      </li>
    </dropdown>
    <!-- Year -->
    <dropdown class="pull-left" v-bind:title="yearText">
      <li class="pointer"
        v-for="ii in 100"
        @click="setYear(currentYear - ii + 1)"
      >
        <a>
          {{ currentYear - ii + 1}}
        </a>
      </li>
    </dropdown>
  </div>
</template>
<script>
  const months = [
    {short:'Jan', long: 'January'},
    {short:'Feb', long: 'February'},
    {short:'Mar', long: 'March'},
    {short:'Apr', long: 'April'},
    {short:'May', long: 'May'},
    {short:'Jun', long: 'June'},
    {short:'Jul', long: 'July'},
    {short:'Sep', long: 'September'},
    {short:'Oct', long: 'October'},
    {short:'Nov', long: 'November'},
    {short:'Dec', long: 'December'}
  ];
  import Dropdown from './Dropdown'

  export default {
    components: {
      Dropdown
    },
    props: [
      'value'
    ],
    data () {
      let today = new Date();
      return {
        currentYear: today.getFullYear(),
        months: months,
        day: 0,
        dayText: 'Day',
        month: 0,
        monthText: 'Month',
        year: 0,
        yearText: 'Year'
      }
    },
    computed: {
      maxDay() {
        return new Date(this.year, this.month, 0).getDate();
      }
    },
    methods: {
      change() {
        if (this.day > this.maxDay) {
          this.day = this.maxDay;
        }
        this.$emit('input', this.year + '-' + this.month + '-' + this.day);
      },
      setDay(day) {
        this.day = day;
        this.dayText = day + '.';
        this.change();
      },
      setMonth(index) {
        this.month = index + 1;
        this.monthText = months[index].short;
        this.change();
      },
      setYear(year) {
        this.year = year;
        this.yearText = year;
        this.change();
      }
    }
  }
</script>

<style>
  .datepicker .dropdown + .dropdown {
    margin-left: 12px;
  }
</style>