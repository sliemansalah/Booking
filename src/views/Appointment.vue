<template>
  <div id="appointmentPage">
    <div class="appointment-header" />
    <div class="appointment-header2">
      <div class="container">
        <div class="row">
          <div class="col-md-5 block right-block">
            <p class="text-bold">سفارة فلسطين</p>
            <p class="text-bold">المملكة العربية السعودية</p>
          </div>
          <div class="col-md-2 block text-center">
            <img src="/booking/palestine.png" alt="" />
          </div>
          <div class="col-md-5 block">
            <p class="text-bold text-uppercase">embassy of palestine</p>
            <p class="text-uppercase">Kingdom of saudi arabia</p>
          </div>
        </div>
      </div>
    </div>

    <div class="menu mt-5">
      <div class="menu-btn">الرئيسية</div>
      <div class="menu-btn">السفارة</div>
      <div class="menu-btn">القنصلية</div>
      <div class="menu-btn">فلسطين</div>
      <div class="menu-btn">السعودية</div>
      <div class="menu-btn">روابط هامة</div>
      <div class="menu-btn">وثائق هامة</div>
      <div class="menu-btn">الأخبار</div>
      <div class="menu-btn active">حجز موعد</div>
      <div class="menu-btn">اتصل بنا</div>
    </div>

     <div style="position:relative;bottom:30px;">
         <div class="block">
    <el-date-picker
        style="margin-left:30%;"
      v-model="date"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
  </div>

    <el-time-select
  v-model="time"
  style="margin-left:50%;position:relative;bottom:40px;"
  :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
  placeholder="Select time">
</el-time-select>
     </div>


    <form class="appointmentForm">
        <h6>الرجاء إدخال البيانات الشخصية لتأكيد الحجز</h6>
        <div class="row" style="margin-right:20%;">
            <div class="col-md-4">
             <span class="custom-span-appointment">الإسم رباعي</span>
             <input  value="محمود عبد الله سلطان السعيدي" class="form-control custom-input-appointment" type="text">
            </div>
            <div class="col-md-4">
              <span class="custom-span-appointment" >رقم الموبايل</span>
                <input  value="+99612345789" class="form-control custom-input-appointment" type="text">
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row" style="margin-right:20%;margin-top:15px;">
            <div class="col-md-4">
             <span class="custom-span-appointment">البريد الإلكتروني</span>
             <input  placeholder="name@example.com" class="form-control custom-input-appointment" type="text">
            </div>
            <div class="col-md-4">
              <span class="custom-span-appointment">عدد المرافقين</span>
                <input  placeholder="أدخل عدد المرافقين الذين سيكونون معك" class="form-control custom-input-appointment" type="text">
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row" style="margin-right:20%;margin-top:15px;">
            <div class="col-md-4">
             <span class="custom-span-appointment">عدد المعاملات</span>
             <input  placeholder="أدخل عدد المعاملات التي تود إنجازها" class="form-control custom-input-appointment" type="text">
            </div>
            <div class="col-md-4">
              <span class="custom-span-appointment">نوع المعاملات</span>
                <el-select 
                multiple 
                v-model="selected" 
                style="width:100%;" 
                class="custom-input-appointment">
                <el-option v-for="(option, optionIndex) in options" :key="optionIndex"
                :label="option.value" :value="option.id"
                ></el-option>
                </el-select>
            </div>
            <div class="col-md-4"></div>    
        </div>
        <div class="row">
            <div class="selected-items" v-if="selected.length>0">
                    <div 
                    class="selected-item"
                    v-for="(item, index) in selected" :key="index">
                        {{options.find(op=>op.id == item).value}}
                    </div>
                </div>
        </div>
        <div class="row">
            <div class="selected-items">
                    <textarea placeholder="ملاحظات أخرى" style="width:100%;border:0;"></textarea>
                </div>
        </div>

         <div class="row">
            <el-button type="primary" class="custom-btn">تأكيد الحجز</el-button>
        </div>
    </form>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            time: '',
            selected: [],
            options: [
                {
                    id: 1,
                    value: 'إصدار وتجديد جواز السفر الفلسطيني'
                },
                {
                    id: 2,
                    value: 'إصدار إفادات بتغيير الاسم'
                },
                 {
                    id: 3,
                    value: 'إصدار وتجديد جواز السفر الفلسطيني'
                },
                {
                    id: 4,
                    value: 'إصدار إفادات بتغيير الاسم'
                }
            ]
        }
    },
};
</script>

<style lang="scss">
@import url('/assets/bootstrap4/bootstrap.min.css');
</style>
