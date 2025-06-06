
import type { Division } from './types';

export const divisions: Division[] = [
  {
    id: 'barishal',
    name: 'বরিশাল',
    districts: [
      {
        id: 'barguna_dist',
        name: 'বরগুনা',
        thanas: [
          { id: 'bar_th_amtali', name: 'আমতলী' },
          { id: 'bar_th_bamna', name: 'বামনা' },
          { id: 'bar_th_barguna_sadar', name: 'বরগুনা সদর' },
          { id: 'bar_th_betagi', name: 'বেতাগী' },
          { id: 'bar_th_patharghata', name: 'পাথরঘাটা' },
          { id: 'bar_th_taltali', name: 'তালতলী' },
        ],
      },
      {
        id: 'barishal_dist',
        name: 'বরিশাল',
        thanas: [
          { id: 'brl_th_agasthajhara', name: 'আগৈলঝাড়া' },
          { id: 'brl_th_babuganj', name: 'বাবুগঞ্জ' },
          { id: 'brl_th_banaripara', name: 'বানারীপাড়া' },
          { id: 'brl_th_gaurnadi', name: 'গৌরনদী' },
          { id: 'brl_th_hizla', name: 'হিজলা' },
          { id: 'brl_th_kotwali', name: 'বরিশাল সদর (কোতোয়ালী)' },
          { id: 'brl_th_mehendiganj', name: 'মেহেন্দিগঞ্জ' },
          { id: 'brl_th_muladi', name: 'মুলাদী' },
          { id: 'brl_th_wazirpur', name: 'উজিরপুর' },
          { id: 'brl_th_bakerganj', name: 'বাকেরগঞ্জ' },
        ],
      },
      {
        id: 'bhola_dist',
        name: 'ভোলা',
        thanas: [
          { id: 'bho_th_bhola_sadar', name: 'ভোলা সদর' },
          { id: 'bho_th_burhanuddin', name: 'বোরহানউদ্দিন' },
          { id: 'bho_th_char_fasson', name: 'চরফ্যাশন' },
          { id: 'bho_th_daulatkhan', name: 'দৌলতখান' },
          { id: 'bho_th_lalmohan', name: 'লালমোহন' },
          { id: 'bho_th_manpura', name: 'মনপুরা' },
          { id: 'bho_th_tazumuddin', name: 'তজুমদ্দিন' },
        ],
      },
      {
        id: 'jhalokati_dist',
        name: 'ঝালকাঠি',
        thanas: [
          { id: 'jha_th_jhalokati_sadar', name: 'ঝালকাঠি সদর' },
          { id: 'jha_th_kathalia', name: 'কাঁঠালিয়া' },
          { id: 'jha_th_nalchity', name: 'নলছিটি' },
          { id: 'jha_th_rajapur', name: 'রাজাপুর' },
        ],
      },
      {
        id: 'patuakhali_dist',
        name: 'পটুয়াখালী',
        thanas: [
          { id: 'pat_th_bauphal', name: 'বাউফল' },
          { id: 'pat_th_dasmina', name: 'দশমিনা' },
          { id: 'pat_th_galachipa', name: 'গলাচিপা' },
          { id: 'pat_th_kalapara', name: 'কলাপাড়া' },
          { id: 'pat_th_mirzaganj', name: 'মির্জাগঞ্জ' },
          { id: 'pat_th_patuakhali_sadar', name: 'পটুয়াখালী সদর' },
          { id: 'pat_th_dumki', name: 'দুমকি' },
          { id: 'pat_th_rangabali', name: 'রাঙ্গাবালী' },
        ],
      },
      {
        id: 'pirojpur_dist',
        name: 'পিরোজপুর',
        thanas: [
          { id: 'pir_th_bhandaria', name: 'ভান্ডারিয়া' },
          { id: 'pir_th_kawkhali', name: 'কাউখালী' },
          { id: 'pir_th_mathbaria', name: 'মঠবাড়িয়া' },
          { id: 'pir_th_nazirpur', name: 'নাজিরপুর' },
          { id: 'pir_th_pirojpur_sadar', name: 'পিরোজপুর সদর' },
          { id: 'pir_th_nesarabad', name: 'নেছারাবাদ (স্বরূপকাঠি)' },
          { id: 'pir_th_zianagar', name: 'ইন্দুরকানী (জিয়ানগর)' },
        ],
      },
    ],
  },
  {
    id: 'chattogram',
    name: 'চট্টগ্রাম',
    districts: [
      {
        id: 'bandarban_dist',
        name: 'বান্দরবান',
        thanas: [
          { id: 'ban_th_ali_kadam', name: 'আলীকদম' },
          { id: 'ban_th_bandarban_sadar', name: 'বান্দরবান সদর' },
          { id: 'ban_th_lama', name: 'লামা' },
          { id: 'ban_th_naikhongchhari', name: 'নাইক্ষ্যংছড়ি' },
          { id: 'ban_th_rowangchhari', name: 'রোয়াংছড়ি' },
          { id: 'ban_th_ruma', name: 'রুমা' },
          { id: 'ban_th_thanchi', name: 'থানচি' },
        ],
      },
      {
        id: 'brahmanbaria_dist',
        name: 'ব্রাহ্মণবাড়িয়া',
        thanas: [
          { id: 'bra_th_akharua', name: 'আখাউড়া' },
          { id: 'bra_th_bancharampur', name: 'বাঞ্ছারামপুর' },
          { id: 'bra_th_bijoynagar', name: 'বিজয়নগর' },
          { id: 'bra_th_brahmanbaria_sadar', name: 'ব্রাহ্মণবাড়িয়া সদর' },
          { id: 'bra_th_kasba', name: 'কসবা' },
          { id: 'bra_th_nabinagar', name: 'নবীনগর' },
          { id: 'bra_th_nasirnagar', name: 'নাসিরনগর' },
          { id: 'bra_th_sarail', name: 'সরাইল' },
          { id: 'bra_th_ashuganj', name: 'আশুগঞ্জ' },
        ],
      },
      {
        id: 'chandpur_dist',
        name: 'চাঁদপুর',
        thanas: [
          { id: 'cha_th_chandpur_sadar', name: 'চাঁদপুর সদর' },
          { id: 'cha_th_faridganj', name: 'ফরিদগঞ্জ' },
          { id: 'cha_th_haimchar', name: 'হাইমচর' },
          { id: 'cha_th_haziganj', name: 'হাজীগঞ্জ' },
          { id: 'cha_th_kachua', name: 'কচুয়া' },
          { id: 'cha_th_matlab_dakshin', name: 'মতলব দক্ষিণ' },
          { id: 'cha_th_matlab_uttar', name: 'মতলব উত্তর' },
          { id: 'cha_th_shahrasti', name: 'শাহরাস্তি' },
        ],
      },
      {
        id: 'chattogram_dist',
        name: 'চট্টগ্রাম',
        thanas: [
          { id: 'cht_th_anwara', name: 'আনোয়ারা' },
          { id: 'cht_th_banshkhali', name: 'বাঁশখালী' },
          { id: 'cht_th_boalkhali', name: 'বোয়ালখালী' },
          { id: 'cht_th_chandanaish', name: 'চন্দনাইশ' },
          { id: 'cht_th_fatikchhari', name: 'ফটিকছড়ি' },
          { id: 'cht_th_hathazari', name: 'হাটহাজারী' },
          { id: 'cht_th_karnaphuli', name: 'কর্ণফুলী' },
          { id: 'cht_th_lohajagara', name: 'লোহাগাড়া' },
          { id: 'cht_th_mirsharai', name: 'মীরসরাই' },
          { id: 'cht_th_patiya', name: 'পটিয়া' },
          { id: 'cht_th_rangunia', name: 'রাঙ্গুনিয়া' },
          { id: 'cht_th_raojaan', name: 'রাউজান' },
          { id: 'cht_th_sandwip', name: 'সন্দ্বীপ' },
          { id: 'cht_th_satkania', name: 'সাতকানিয়া' },
          { id: 'cht_th_sitakunda', name: 'সীতাকুণ্ড' },
          { id: 'cht_th_bandar', name: 'বন্দর' },
          { id: 'cht_th_chandgaon', name: 'চান্দগাঁও' },
          { id: 'cht_th_double_mooring', name: 'ডবলমুরিং' },
          { id: 'cht_th_kotwali_ctg', name: 'কোতোয়ালী (চট্টগ্রাম)' },
          { id: 'cht_th_pahartali', name: 'পাহাড়তলী' },
          { id: 'cht_th_panchlaish', name: 'পাঁচলাইশ' },
        ],
      },
      {
        id: 'cumilla_dist',
        name: 'কুমিল্লা',
        thanas: [
          { id: 'cum_th_barura', name: 'বরুড়া' },
          { id: 'cum_th_brahmanpara', name: 'ব্রাহ্মণপাড়া' },
          { id: 'cum_th_burichang', name: 'বুড়িচং' },
          { id: 'cum_th_chandina', name: 'চান্দিনা' },
          { id: 'cum_th_chauddagram', name: 'চৌদ্দগ্রাম' },
          { id: 'cum_th_cumilla_sadar_dakshin', name: 'কুমিল্লা সদর দক্ষিণ' },
          { id: 'cum_th_daudkandi', name: 'দাউদকান্দি' },
          { id: 'cum_th_debidwar', name: 'দেবীদ্বার' },
          { id: 'cum_th_homna', name: 'হোমনা' },
          { id: 'cum_th_laksham', name: 'লাকসাম' },
          { id: 'cum_th_monohorgonj', name: 'মনোহরগঞ্জ' },
          { id: 'cum_th_meghna', name: 'মেঘনা' },
          { id: 'cum_th_muradnagar', name: 'মুরাদনগর' },
          { id: 'cum_th_nangalkot', name: 'নাঙ্গলকোট' },
          { id: 'cum_th_titas', name: 'তিতাস' },
          { id: 'cum_th_lalmai', name: 'লালমাই' },
          { id: 'cum_th_adarsha_sadar', name: 'আদর্শ সদর' },
        ],
      },
      {
        id: 'coxsbazar_dist',
        name: 'কক্সবাজার',
        thanas: [
          { id: 'cox_th_chakaria', name: 'চকোরিয়া' },
          { id: 'cox_th_coxsbazar_sadar', name: 'কক্সবাজার সদর' },
          { id: 'cox_th_kutubdia', name: 'কুতুবদিয়া' },
          { id: 'cox_th_maheshkhali', name: 'মহেশখালী' },
          { id: 'cox_th_pekua', name: 'পেকুয়া' },
          { id: 'cox_th_ramu', name: 'রামু' },
          { id: 'cox_th_teknaf', name: 'টেকনাফ' },
          { id: 'cox_th_ukhiya', name: 'উখিয়া' },
        ],
      },
      {
        id: 'feni_dist',
        name: 'ফেনী',
        thanas: [
          { id: 'fen_th_chagalnaiya', name: 'ছাগলনাইয়া' },
          { id: 'fen_th_daganbhuiyan', name: 'দাগনভূঞা' },
          { id: 'fen_th_feni_sadar', name: 'ফেনী সদর' },
          { id: 'fen_th_parshuram', name: 'পরশুরাম' },
          { id: 'fen_th_sonagazi', name: 'সোনাগাজী' },
          { id: 'fen_th_fulgazi', name: 'ফুলগাজী' },
        ],
      },
      {
        id: 'khagrachhari_dist',
        name: 'খাগড়াছড়ি',
        thanas: [
          { id: 'khg_th_dighinala', name: 'দীঘিনালা' },
          { id: 'khg_th_khagrachhari_sadar', name: 'খাগড়াছড়ি সদর' },
          { id: 'khg_th_lakshmichhari', name: 'লক্ষীছড়ি' },
          { id: 'khg_th_mahalchhari', name: 'মহালছড়ি' },
          { id: 'khg_th_manikchhari', name: 'মানিকছড়ি' },
          { id: 'khg_th_matiranga', name: 'মাটিরাঙ্গা' },
          { id: 'khg_th_panchhari', name: 'পানছড়ি' },
          { id: 'khg_th_ramgarh', name: 'রামগড়' },
          { id: 'khg_th_guimara', name: 'গুইমারা' },
        ],
      },
      {
        id: 'lakshmipur_dist',
        name: 'লক্ষ্মীপুর',
        thanas: [
          { id: 'lak_th_kamalnagar', name: 'কমলনগর' },
          { id: 'lak_th_lakshmipur_sadar', name: 'লক্ষ্মীপুর সদর' },
          { id: 'lak_th_raipur', name: 'রায়পুর' },
          { id: 'lak_th_ramganj', name: 'রামগঞ্জ' },
          { id: 'lak_th_ramgati', name: 'রামগতি' },
        ],
      },
      {
        id: 'noakhali_dist',
        name: 'নোয়াখালী',
        thanas: [
          { id: 'noa_th_begumganj', name: 'বেগমগঞ্জ' },
          { id: 'noa_th_chatkhil', name: 'চাটখিল' },
          { id: 'noa_th_companiganj', name: 'কোম্পানীগঞ্জ' },
          { id: 'noa_th_hatiya', name: 'হাতিয়া' },
          { id: 'noa_th_kabirhat', name: 'কবিরহাট' },
          { id: 'noa_th_senbag', name: 'সেনবাগ' },
          { id: 'noa_th_sonaimuri', name: 'সোনাইমুড়ী' },
          { id: 'noa_th_subarnachar', name: 'সুবর্ণচর' },
          { id: 'noa_th_sudharam', name: 'নোয়াখালী সদর (সুধারাম)' },
        ],
      },
      {
        id: 'rangamati_dist',
        name: 'রাঙ্গামাটি',
        thanas: [
          { id: 'ran_th_baghaichhari', name: 'বাঘাইছড়ি' },
          { id: 'ran_th_barkal', name: 'বরকল' },
          { id: 'ran_th_belaichhari', name: 'বিলাইছড়ি' },
          { id: 'ran_th_juraichhari', name: 'জুরাছড়ি' },
          { id: 'ran_th_kaptai', name: 'কাপ্তাই' },
          { id: 'ran_th_kaukhali', name: 'কাউখালী' },
          { id: 'ran_th_langadu', name: 'লংগদু' },
          { id: 'ran_th_naniarchar', name: 'নানিয়ারচর' },
          { id: 'ran_th_rajasthali', name: 'রাজস্থলী' },
          { id: 'ran_th_rangamati_sadar', name: 'রাঙ্গামাটি সদর' },
        ],
      },
    ],
  },
  {
    id: 'dhaka',
    name: 'ঢাকা',
    districts: [
      {
        id: 'dhaka_dist',
        name: 'ঢাকা',
        thanas: [
          { id: 'dhk_th_adabor', name: 'আদাবর' },
          { id: 'dhk_th_badda', name: 'বাড্ডা' },
          { id: 'dhk_th_bimanbandar', name: 'বিমানবন্দর' },
          { id: 'dhk_th_bangshal', name: 'বংশাল' },
          { id: 'dhk_th_cantonment', name: 'ক্যান্টনমেন্ট' },
          { id: 'dhk_th_chakbazar', name: 'চকবাজার' },
          { id: 'dhk_th_darus_salam', name: 'দারুস সালাম' },
          { id: 'dhk_th_demra', name: 'ডেমরা' },
          { id: 'dhk_th_dhanmondi', name: 'ধানমন্ডি' },
          { id: 'dhk_th_gulshan', name: 'গুলশান' },
          { id: 'dhk_th_gendaria', name: 'গেন্ডারিয়া' },
          { id: 'dhk_th_hazaribagh', name: 'হাজারীবাগ' },
          { id: 'dhk_th_jatrabari', name: 'যাত্রাবাড়ী' },
          { id: 'dhk_th_kadamtali', name: 'কদমতলী' },
          { id: 'dhk_th_kafrul', name: 'কাফরুল' },
          { id: 'dhk_th_kalabagan', name: 'কলাবাগান' },
          { id: 'dhk_th_kamrangirchar', name: 'কামরাঙ্গীরচর' },
          { id: 'dhk_th_khilgaon', name: 'খিলগাঁও' },
          { id: 'dhk_th_khilkhet', name: 'খিলক্ষেত' },
          { id: 'dhk_th_kotwali_dhk', name: 'কোতোয়ালী (ঢাকা)' },
          { id: 'dhk_th_lalbagh', name: 'লালবাগ' },
          { id: 'dhk_th_mirpur', name: 'মিরপুর' },
          { id: 'dhk_th_mohammadpur', name: 'মোহাম্মদপুর' },
          { id: 'dhk_th_motijheel', name: 'মতিঝিল' },
          { id: 'dhk_th_new_market', name: 'নিউ মার্কেট' },
          { id: 'dhk_th_pallabi', name: 'পল্লবী' },
          { id: 'dhk_th_paltan', name: 'পল্টন' },
          { id: 'dhk_th_ramna', name: 'রমনা' },
          { id: 'dhk_th_rampura', name: 'রামপুরা' },
          { id: 'dhk_th_sabujbagh', name: 'সবুজবাগ' },
          { id: 'dhk_th_shah_ali', name: 'শাহ আলী' },
          { id: 'dhk_th_shahbagh', name: 'শাহবাগ' },
          { id: 'dhk_th_sher_e_bangla_nagar', name: 'শেরেবাংলা নগর' },
          { id: 'dhk_th_shyampur', name: 'শ্যামপুর' },
          { id: 'dhk_th_sutrapur', name: 'সূত্রাপুর' },
          { id: 'dhk_th_tejgaon', name: 'তেজগাঁও' },
          { id: 'dhk_th_tejgaon_industrial_area', name: 'তেজগাঁও শিল্পাঞ্চল' },
          { id: 'dhk_th_turag', name: 'তুরাগ' },
          { id: 'dhk_th_uttara_east', name: 'উত্তরা পূর্ব' },
          { id: 'dhk_th_uttara_west', name: 'উত্তরা পশ্চিম' },
          { id: 'dhk_th_uttarkhan', name: 'উত্তরখান' },
          { id: 'dhk_th_dakshinkhan', name: 'দক্ষিণখান' },
          { id: 'dhk_th_dohar', name: 'দোহার' },
          { id: 'dhk_th_keraniganj', name: 'কেরানীগঞ্জ' },
          { id: 'dhk_th_nawabganj', name: 'নবাবগঞ্জ' },
          { id: 'dhk_th_savar', name: 'সাভার' },
          { id: 'dhk_th_dhamrai', name: 'ধামরাই' },
        ],
      },
      {
        id: 'faridpur_dist',
        name: 'ফরিদপুর',
        thanas: [
          { id: 'far_th_alfadanga', name: 'আলফাডাঙ্গা' },
          { id: 'far_th_bhanga', name: 'ভাঙ্গা' },
          { id: 'far_th_boalmari', name: 'বোয়ালমারী' },
          { id: 'far_th_charbhadrasan', name: 'চরভদ্রাসন' },
          { id: 'far_th_faridpur_sadar', name: 'ফরিদপুর সদর' },
          { id: 'far_th_madhukhali', name: 'মধুখালী' },
          { id: 'far_th_nagarkanda', name: 'নগরকান্দা' },
          { id: 'far_th_sadarpur', name: 'সদরপুর' },
          { id: 'far_th_saltha', name: 'সালথা' },
        ],
      },
      {
        id: 'gazipur_dist',
        name: 'গাজীপুর',
        thanas: [
          { id: 'gaz_th_gazipur_sadar', name: 'গাজীপুর সদর' },
          { id: 'gaz_th_kaliakoir', name: 'কালিয়াকৈর' },
          { id: 'gaz_th_kaliganj', name: 'কালীগঞ্জ' },
          { id: 'gaz_th_kapasia', name: 'কাপাসিয়া' },
          { id: 'gaz_th_sreepur', name: 'শ্রীপুর' },
        ],
      },
      {
        id: 'gopalganj_dist',
        name: 'গোপালগঞ্জ',
        thanas: [
          { id: 'gop_th_gopalganj_sadar', name: 'গোপালগঞ্জ সদর' },
          { id: 'gop_th_kashiani', name: 'কাশিয়ানী' },
          { id: 'gop_th_kotalipara', name: 'কোটালীপাড়া' },
          { id: 'gop_th_muksudpur', name: 'মুকসুদপুর' },
          { id: 'gop_th_tungipara', name: 'টুঙ্গিপাড়া' },
        ],
      },
      {
        id: 'kishoreganj_dist',
        name: 'কিশোরগঞ্জ',
        thanas: [
          { id: 'kis_th_austagram', name: 'অষ্টগ্রাম' },
          { id: 'kis_th_bajidpur', name: 'বাজিতপুর' },
          { id: 'kis_th_bhairab', name: 'ভৈরব' },
          { id: 'kis_th_hossainpur', name: 'হোসেনপুর' },
          { id: 'kis_th_itna', name: 'ইটনা' },
          { id: 'kis_th_karimganj', name: 'করিমগঞ্জ' },
          { id: 'kis_th_katiadi', name: 'কটিয়াদী' },
          { id: 'kis_th_kishoreganj_sadar', name: 'কিশোরগঞ্জ সদর' },
          { id: 'kis_th_kuliarchar', name: 'কুলিয়ারচর' },
          { id: 'kis_th_mithamain', name: 'মিঠামইন' },
          { id: 'kis_th_nikli', name: 'নিকলী' },
          { id: 'kis_th_pakundia', name: 'পাকুন্দিয়া' },
          { id: 'kis_th_tarail', name: 'তাড়াইল' },
        ],
      },
      {
        id: 'madaripur_dist',
        name: 'মাদারীপুর',
        thanas: [
          { id: 'mad_th_kalkini', name: 'কালকিনি' },
          { id: 'mad_th_madaripur_sadar', name: 'মাদারীপুর সদর' },
          { id: 'mad_th_rajoir', name: 'রাজৈর' },
          { id: 'mad_th_shibchar', name: 'শিবচর' },
          { id: 'mad_th_dasar', name: 'ডাসার' },
        ],
      },
      {
        id: 'manikganj_dist',
        name: 'মানিকগঞ্জ',
        thanas: [
          { id: 'man_th_daulatpur', name: 'দৌলতপুর' },
          { id: 'man_th_ghior', name: 'ঘিওর' },
          { id: 'man_th_harirampur', name: 'হরিরামপুর' },
          { id: 'man_th_manikganj_sadar', name: 'মানিকগঞ্জ সদর' },
          { id: 'man_th_shivalaya', name: 'শিবালয়' },
          { id: 'man_th_singair', name: 'সিংগাইর' },
          { id: 'man_th_saturia', name: 'সাটুরিয়া' },
        ],
      },
      {
        id: 'munshiganj_dist',
        name: 'মুন্সিগঞ্জ',
        thanas: [
          { id: 'mun_th_gazaria', name: 'গজারিয়া' },
          { id: 'mun_th_louhajang', name: 'লৌহজং' },
          { id: 'mun_th_munshiganj_sadar', name: 'মুন্সিগঞ্জ সদর' },
          { id: 'mun_th_sirajdikhan', name: 'সিরাজদিখান' },
          { id: 'mun_th_sreenagar', name: 'শ্রীনগর' },
          { id: 'mun_th_tongibari', name: 'টংগিবাড়ী' },
        ],
      },
      {
        id: 'narayanganj_dist',
        name: 'নারায়ণগঞ্জ',
        thanas: [
          { id: 'nar_th_araihazar', name: 'আড়াইহাজার' },
          { id: 'nar_th_bandar', name: 'বন্দর' },
          { id: 'nar_th_narayanganj_sadar', name: 'নারায়ণগঞ্জ সদর' },
          { id: 'nar_th_rupganj', name: 'রূপগঞ্জ' },
          { id: 'nar_th_sonargaon', name: 'সোনারগাঁও' },
          { id: 'nar_th_siddhirganj', name: 'সিদ্ধিরগঞ্জ' },
          { id: 'nar_th_phatullah', name: 'ফতুল্লা' },
        ],
      },
      {
        id: 'narsingdi_dist',
        name: 'নরসিংদী',
        thanas: [
          { id: 'nrs_th_belabo', name: 'বেলাবো' },
          { id: 'nrs_th_manohardi', name: 'মনোহরদী' },
          { id: 'nrs_th_narsingdi_sadar', name: 'নরসিংদী সদর' },
          { id: 'nrs_th_palash', name: 'পলাশ' },
          { id: 'nrs_th_raipura', name: 'রায়পুরা' },
          { id: 'nrs_th_shibpur', name: 'শিবপুর' },
        ],
      },
      {
        id: 'rajbari_dist',
        name: 'রাজবাড়ী',
        thanas: [
          { id: 'raj_th_baliakandi', name: 'বালিয়াকান্দি' },
          { id: 'raj_th_goalanda', name: 'গোয়ালন্দ' },
          { id: 'raj_th_pangsha', name: 'পাংশা' },
          { id: 'raj_th_rajbari_sadar', name: 'রাজবাড়ী সদর' },
          { id: 'raj_th_kalukhali', name: 'কালুখালী' },
        ],
      },
      {
        id: 'shariatpur_dist',
        name: 'শরীয়তপুর',
        thanas: [
          { id: 'sha_th_bhedarganj', name: 'ভেদরগঞ্জ' },
          { id: 'sha_th_damudya', name: 'ডামুড্যা' },
          { id: 'sha_th_gosairhat', name: 'গোসাইরহাট' },
          { id: 'sha_th_naria', name: 'নড়িয়া' },
          { id: 'sha_th_shariatpur_sadar', name: 'শরীয়তপুর সদর' },
          { id: 'sha_th_zajira', name: 'জাজিরা' },
          { id: 'sha_th_sakhipur', name: 'সখিপুর' },
        ],
      },
      {
        id: 'tangail_dist',
        name: 'টাঙ্গাইল',
        thanas: [
          { id: 'tan_th_basail', name: 'বাসাইল' },
          { id: 'tan_th_bhuapur', name: 'ভূঞাপুর' },
          { id: 'tan_th_delduar', name: 'দেলদুয়ার' },
          { id: 'tan_th_ghatail', name: 'ঘাটাইল' },
          { id: 'tan_th_gopalpur', name: 'গোপালপুর' },
          { id: 'tan_th_kalihati', name: 'কালিহাতী' },
          { id: 'tan_th_madhupur', name: 'মধুপুর' },
          { id: 'tan_th_mirzapur', name: 'মির্জাপুর' },
          { id: 'tan_th_nagarpur', name: 'নাগরপুর' },
          { id: 'tan_th_sakhipur', name: 'সখিপুর' },
          { id: 'tan_th_tangail_sadar', name: 'টাঙ্গাইল সদর' },
          { id: 'tan_th_dhanbari', name: 'ধনবাড়ী' },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    name: 'খুলনা',
    districts: [
      {
        id: 'bagerhat_dist',
        name: 'বাগেরহাট',
        thanas: [
          { id: 'bag_th_bagerhat_sadar', name: 'বাগেরহাট সদর' },
          { id: 'bag_th_chitalmari', name: 'চিতলমারী' },
          { id: 'bag_th_fakirhat', name: 'ফকিরহাট' },
          { id: 'bag_th_kachua', name: 'কচুয়া' },
          { id: 'bag_th_mollahat', name: 'মোল্লাহাট' },
          { id: 'bag_th_mongla', name: 'মোংলা' },
          { id: 'bag_th_morrelganj', name: 'মোড়েলগঞ্জ' },
          { id: 'bag_th_rampal', name: 'রামপাল' },
          { id: 'bag_th_sarankhola', name: 'শরণখোলা' },
        ],
      },
      {
        id: 'chuadanga_dist',
        name: 'চুয়াডাঙ্গা',
        thanas: [
          { id: 'chu_th_alamdanga', name: 'আলমডাঙ্গা' },
          { id: 'chu_th_chuadanga_sadar', name: 'চুয়াডাঙ্গা সদর' },
          { id: 'chu_th_damurhuda', name: 'দামুড়হুদা' },
          { id: 'chu_th_jibannagar', name: 'জীবননগর' },
        ],
      },
      {
        id: 'jashore_dist',
        name: 'যশোর',
        thanas: [
          { id: 'jas_th_abhaynagar', name: 'অভয়নগর' },
          { id: 'jas_th_bagherpara', name: 'বাঘারপাড়া' },
          { id: 'jas_th_chaugachha', name: 'চৌগাছা' },
          { id: 'jas_th_jessore_sadar', name: 'যশোর সদর' },
          { id: 'jas_th_jhikargachha', name: 'ঝিকরগাছা' },
          { id: 'jas_th_keshabpur', name: 'কেশবপুর' },
          { id: 'jas_th_manirampur', name: 'মনিরামপুর' },
          { id: 'jas_th_sharsha', name: 'শার্শা' },
        ],
      },
      {
        id: 'jhenaidah_dist',
        name: 'ঝিনাইদহ',
        thanas: [
          { id: 'jhe_th_harinakunda', name: 'হরিণাকুন্ডু' },
          { id: 'jhe_th_jhenaidah_sadar', name: 'ঝিনাইদহ সদর' },
          { id: 'jhe_th_kaliganj', name: 'কালীগঞ্জ' },
          { id: 'jhe_th_kotchandpur', name: 'কোটচাঁদপুর' },
          { id: 'jhe_th_maheshpur', name: 'মহেশপুর' },
          { id: 'jhe_th_shailkupa', name: 'শৈলকুপা' },
        ],
      },
      {
        id: 'khulna_dist',
        name: 'খুলনা',
        thanas: [
          { id: 'khu_th_botiaghata', name: 'বটিয়াঘাটা' },
          { id: 'khu_th_dighalia', name: 'দিঘলিয়া' },
          { id: 'khu_th_dumuria', name: 'ডুমুরিয়া' },
          { id: 'khu_th_koyra', name: 'কয়রা' },
          { id: 'khu_th_paikgachha', name: 'পাইকগাছা' },
          { id: 'khu_th_phultala', name: 'ফুলতলা' },
          { id: 'khu_th_terokhada', name: 'তেরখাদা' },
          { id: 'khu_th_daulatpur_khl', name: 'দৌলতপুর (খুলনা)' },
          { id: 'khu_th_khalishpur', name: 'খালিশপুর' },
          { id: 'khu_th_khan_jahan_ali', name: 'খান জাহান আলী' },
          { id: 'khu_th_kotwali_khl', name: 'কোতোয়ালী (খুলনা)' },
          { id: 'khu_th_sonadanga', name: 'সোনাডাঙ্গা' },
          { id: 'khu_th_harintana', name: 'হরিণটানা' },
          { id: 'khu_th_labanchora', name: 'লবণচরা' },
        ],
      },
      {
        id: 'kushtia_dist',
        name: 'কুষ্টিয়া',
        thanas: [
          { id: 'kus_th_bheramara', name: 'ভেড়ামারা' },
          { id: 'kus_th_daulatpur', name: 'দৌলতপুর' },
          { id: 'kus_th_khoksa', name: 'খোকসা' },
          { id: 'kus_th_kumarkhali', name: 'কুমারখালী' },
          { id: 'kus_th_kushtia_sadar', name: 'কুষ্টিয়া সদর' },
          { id: 'kus_th_mirpur', name: 'মিরপুর' },
        ],
      },
      {
        id: 'magura_dist',
        name: 'মাগুরা',
        thanas: [
          { id: 'mag_th_magura_sadar', name: 'মাগুরা সদর' },
          { id: 'mag_th_mohammadpur', name: 'محمدপুর' },
          { id: 'mag_th_shalikha', name: 'শালিখা' },
          { id: 'mag_th_sreepur', name: 'শ্রীপুর' },
        ],
      },
      {
        id: 'meherpur_dist',
        name: 'মেহেরপুর',
        thanas: [
          { id: 'meh_th_gangni', name: 'গাংনী' },
          { id: 'meh_th_meherpur_sadar', name: 'মেহেরপুর সদর' },
          { id: 'meh_th_mujibnagar', name: 'মুজিবনগর' },
        ],
      },
      {
        id: 'narail_dist',
        name: 'নড়াইল',
        thanas: [
          { id: 'nrl_th_kalia', name: 'কালিয়া' },
          { id: 'nrl_th_lohagora', name: 'লোহাগড়া' },
          { id: 'nrl_th_narail_sadar', name: 'নড়াইল সদর' },
        ],
      },
      {
        id: 'satkhira_dist',
        name: 'সাতক্ষীরা',
        thanas: [
          { id: 'sat_th_assasuni', name: 'আশাশুনি' },
          { id: 'sat_th_debhata', name: 'দেবহাটা' },
          { id: 'sat_th_kalaroa', name: 'কলারোয়া' },
          { id: 'sat_th_kaliganj', name: 'কালীগঞ্জ' },
          { id: 'sat_th_satkhira_sadar', name: 'সাতক্ষীরা সদর' },
          { id: 'sat_th_shyamnagar', name: 'শ্যামনগর' },
          { id: 'sat_th_tala', name: 'তালা' },
        ],
      },
    ],
  },
  {
    id: 'mymensingh',
    name: 'ময়মনসিংহ',
    districts: [
      {
        id: 'jamalpur_dist',
        name: 'জামালপুর',
        thanas: [
          { id: 'jam_th_bakshiganj', name: 'বকশীগঞ্জ' },
          { id: 'jam_th_dewanganj', name: 'দেওয়ানগঞ্জ' },
          { id: 'jam_th_islampur', name: 'ইসলামপুর' },
          { id: 'jam_th_jamalpur_sadar', name: 'জামালপুর সদর' },
          { id: 'jam_th_madarganj', name: 'মাদারগঞ্জ' },
          { id: 'jam_th_melandah', name: 'মেলান্দহ' },
          { id: 'jam_th_sarishabari', name: 'সরিষাবাড়ী' },
        ],
      },
      {
        id: 'mymensingh_dist',
        name: 'ময়মনসিংহ',
        thanas: [
          { id: 'mym_th_bhaluka', name: 'ভালুকা' },
          { id: 'mym_th_dhobaura', name: 'ধোবাউড়া' },
          { id: 'mym_th_fulbaria', name: 'ফুলবাড়ীয়া' },
          { id: 'mym_th_gaffargaon', name: 'গফরগাঁও' },
          { id: 'mym_th_gauripur', name: 'গৌরীপুর' },
          { id: 'mym_th_haliaghat', name: 'হালুয়াঘাট' },
          { id: 'mym_th_ishwarganj', name: 'ঈশ্বরগঞ্জ' },
          { id: 'mym_th_mymensingh_sadar', name: 'ময়মনসিংহ সদর' },
          { id: 'mym_th_muktagachha', name: 'মুক্তাগাছা' },
          { id: 'mym_th_nandail', name: 'নান্দাইল' },
          { id: 'mym_th_phulpur', name: 'ফুলপুর' },
          { id: 'mym_th_trishal', name: 'ত্রিশাল' },
          { id: 'mym_th_tarakanda', name: 'তারাকান্দা' },
        ],
      },
      {
        id: 'netrokona_dist',
        name: 'নেত্রকোণা',
        thanas: [
          { id: 'net_th_atpara', name: 'আটপাড়া' },
          { id: 'net_th_barhatta', name: 'বারহাট্টা' },
          { id: 'net_th_durgapur', name: 'দুর্গাপুর' },
          { id: 'net_th_khaliajuri', name: 'খালিয়াজুরী' },
          { id: 'net_th_kalmakanda', name: 'কলমাকান্দা' },
          { id: 'net_th_kenduya', name: 'কেন্দুয়া' },
          { id: 'net_th_madan', name: 'মদন' },
          { id: 'net_th_mohongonj', name: 'মোহনগঞ্জ' },
          { id: 'net_th_netrokona_sadar', name: 'নেত্রকোণা সদর' },
          { id: 'net_th_purbadhala', name: 'পূর্বধলা' },
        ],
      },
      {
        id: 'sherpur_dist',
        name: 'শেরপুর',
        thanas: [
          { id: 'shr_th_jhinaigati', name: 'ঝিনাইগাতী' },
          { id: 'shr_th_nakla', name: 'নকলা' },
          { id: 'shr_th_nalitabari', name: 'নালিতাবাড়ী' },
          { id: 'shr_th_sherpur_sadar', name: 'শেরপুর সদর' },
          { id: 'shr_th_sreebardi', name: 'শ্রীবরদী' },
        ],
      },
    ],
  },
  {
    id: 'rajshahi',
    name: 'রাজশাহী',
    districts: [
      {
        id: 'bogura_dist',
        name: 'বগুড়া',
        thanas: [
          { id: 'bog_th_adamdighi', name: 'আদমদীঘি' },
          { id: 'bog_th_bogura_sadar', name: 'বগুড়া সদর' },
          { id: 'bog_th_dhunat', name: 'ধুনট' },
          { id: 'bog_th_dhupchanchia', name: 'দুপচাঁচিয়া' },
          { id: 'bog_th_gabtali', name: 'গাবতলী' },
          { id: 'bog_th_kahaloo', name: 'কাহালু' },
          { id: 'bog_th_nandigram', name: 'নন্দীগ্রাম' },
          { id: 'bog_th_sahajanpur', name: 'শাজাহানপুর' },
          { id: 'bog_th_sariakandi', name: 'সারিয়াকান্দি' },
          { id: 'bog_th_sherpur', name: 'শেরপুর' },
          { id: 'bog_th_shibganj', name: 'শিবগঞ্জ' },
          { id: 'bog_th_sonatola', name: 'সোনাতলা' },
        ],
      },
      {
        id: 'chapainawabganj_dist',
        name: 'চাঁপাইনবাবগঞ্জ',
        thanas: [
          { id: 'chn_th_bholahat', name: 'ভোলাহাট' },
          { id: 'chn_th_gomastapur', name: 'গোমস্তাপুর' },
          { id: 'chn_th_nachole', name: 'নাচোল' },
          { id: 'chn_th_chapainawabganj_sadar', name: 'চাঁপাইনবাবগঞ্জ সদর' },
          { id: 'chn_th_shibganj', name: 'শিবগঞ্জ' },
        ],
      },
      {
        id: 'joypurhat_dist',
        name: 'জয়পুরহাট',
        thanas: [
          { id: 'joy_th_akkelpur', name: 'আক্কেলপুর' },
          { id: 'joy_th_joypurhat_sadar', name: 'জয়পুরহাট সদর' },
          { id: 'joy_th_kalai', name: 'কালাই' },
          { id: 'joy_th_khetlal', name: 'ক্ষেতলাল' },
          { id: 'joy_th_panchbibi', name: 'পাঁচবিবি' },
        ],
      },
      {
        id: 'naogaon_dist',
        name: 'নওগাঁ',
        thanas: [
          { id: 'nao_th_atrayi', name: 'আত্রাই' },
          { id: 'nao_th_badalgachhi', name: 'বদলগাছী' },
          { id: 'nao_th_dhamoirhat', name: 'ধামইরহাট' },
          { id: 'nao_th_manda', name: 'মান্দা' },
          { id: 'nao_th_mahadebpur', name: 'মহাদেবপুর' },
          { id: 'nao_th_naogaon_sadar', name: 'নওগাঁ সদর' },
          { id: 'nao_th_niamatpur', name: 'নিয়ামতপুর' },
          { id: 'nao_th_patnitala', name: 'পত্নীতলা' },
          { id: 'nao_th_porsha', name: 'পোরশা' },
          { id: 'nao_th_raninagar', name: 'রাণীনগর' },
          { id: 'nao_th_sapahar', name: 'সাপাহার' },
        ],
      },
      {
        id: 'natore_dist',
        name: 'নাটোর',
        thanas: [
          { id: 'nat_th_bagatipara', name: 'বাগাতিপাড়া' },
          { id: 'nat_th_baraigram', name: 'বড়াইগ্রাম' },
          { id: 'nat_th_gurudaspur', name: 'গুরুদাসপুর' },
          { id: 'nat_th_lalpur', name: 'লালপুর' },
          { id: 'nat_th_natore_sadar', name: 'নাটোর সদর' },
          { id: 'nat_th_singra', name: 'সিংড়া' },
          { id: 'nat_th_naldanga', name: 'নলডাঙ্গা' },
        ],
      },
      {
        id: 'pabna_dist',
        name: 'পাবনা',
        thanas: [
          { id: 'pab_th_atgharia', name: 'আটঘরিয়া' },
          { id: 'pab_th_bera', name: 'বেড়া' },
          { id: 'pab_th_bhangura', name: 'ভাঙ্গুড়া' },
          { id: 'pab_th_chatmohar', name: 'চাটমোহর' },
          { id: 'pab_th_faridpur', name: 'ফরিদপুর' },
          { id: 'pab_th_ishwardi', name: 'ঈশ্বরদী' },
          { id: 'pab_th_pabna_sadar', name: 'পাবনা সদর' },
          { id: 'pab_th_santhia', name: 'সাঁথিয়া' },
          { id: 'pab_th_sujanagar', name: 'সুজানগর' },
        ],
      },
      {
        id: 'rajshahi_dist',
        name: 'রাজশাহী',
        thanas: [
          { id: 'rjs_th_bagha', name: 'বাঘা' },
          { id: 'rjs_th_bagmara', name: 'বাগমারা' },
          { id: 'rjs_th_charghat', name: 'চারঘাট' },
          { id: 'rjs_th_durgapur', name: 'দুর্গাপুর' },
          { id: 'rjs_th_godagari', name: 'গোদাগাড়ী' },
          { id: 'rjs_th_mohanpur', name: 'মোহনপুর' },
          { id: 'rjs_th_paba', name: 'পবা' },
          { id: 'rjs_th_puthia', name: 'পুঠিয়া' },
          { id: 'rjs_th_tanore', name: 'তানোর' },
          { id: 'rjs_th_boalia', name: 'বোয়ালিয়া' },
          { id: 'rjs_th_matihar', name: 'মতিহার' },
          { id: 'rjs_th_rajpara', name: 'রাজপাড়া' },
          { id: 'rjs_th_shahmakdam', name: 'শাহমখদুম' },
        ],
      },
      {
        id: 'sirajganj_dist',
        name: 'সিরাজগঞ্জ',
        thanas: [
          { id: 'sir_th_belkuchi', name: 'বেলকুচি' },
          { id: 'sir_th_chauhati', name: 'চৌহালী' },
          { id: 'sir_th_kamarkhanda', name: 'কামারখন্দ' },
          { id: 'sir_th_kazipur', name: 'কাজীপুর' },
          { id: 'sir_th_raiganj', name: 'রায়গঞ্জ' },
          { id: 'sir_th_shahjadpur', name: 'শাহজাদপুর' },
          { id: 'sir_th_sirajganj_sadar', name: 'সিরাজগঞ্জ সদর' },
          { id: 'sir_th_tarash', name: 'তাড়াশ' },
          { id: 'sir_th_ullapara', name: 'উল্লাপাড়া' },
        ],
      },
    ],
  },
  {
    id: 'rangpur',
    name: 'রংপুর',
    districts: [
      {
        id: 'dinajpur_dist',
        name: 'দিনাজপুর',
        thanas: [
          { id: 'din_th_birampur', name: 'বিরামপুর' },
          { id: 'din_th_birganj', name: 'বীরগঞ্জ' },
          { id: 'din_th_biral', name: 'বিরল' },
          { id: 'din_th_bochaganj', name: 'বোচাগঞ্জ' },
          { id: 'din_th_chirirbandar', name: 'চিরিরবন্দর' },
          { id: 'din_th_dinajpur_sadar', name: 'দিনাজপুর সদর' },
          { id: 'din_th_ghoraghat', name: 'ঘোড়াঘাট' },
          { id: 'din_th_hakimpur', name: 'হাকিমপুর' },
          { id: 'din_th_kaharole', name: 'কাহারোল' },
          { id: 'din_th_khansama', name: 'খানসামা' },
          { id: 'din_th_nababganj', name: 'নবাবগঞ্জ' },
          { id: 'din_th_parbatipur', name: 'পার্বতীপুর' },
          { id: 'din_th_fulbari', name: 'ফুলবাড়ী' },
        ],
      },
      {
        id: 'gaibandha_dist',
        name: 'গাইবান্ধা',
        thanas: [
          { id: 'gai_th_fulchhari', name: 'ফুলছড়ি' },
          { id: 'gai_th_gaibandha_sadar', name: 'গাইবান্ধা সদর' },
          { id: 'gai_th_gobindaganj', name: 'গোবিন্দগঞ্জ' },
          { id: 'gai_th_palashbari', name: 'পলাশবাড়ী' },
          { id: 'gai_th_sadullapur', name: 'সাদুল্লাপুর' },
          { id: 'gai_th_saghata', name: 'সাঘাটা' },
          { id: 'gai_th_sundarganj', name: 'সুন্দরগঞ্জ' },
        ],
      },
      {
        id: 'kurigram_dist',
        name: 'কুড়িগ্রাম',
        thanas: [
          { id: 'kur_th_bhurungamari', name: 'ভূরুঙ্গামারী' },
          { id: 'kur_th_char_rajibpur', name: 'চর রাজিবপুর' },
          { id: 'kur_th_chilmari', name: 'চিলমারী' },
          { id: 'kur_th_kurigram_sadar', name: 'কুড়িগ্রাম সদর' },
          { id: 'kur_th_nageshwari', name: 'নাগেশ্বরী' },
          { id: 'kur_th_phulbari', name: 'ফুলবাড়ী' },
          { id: 'kur_th_rajarhat', name: 'রাজারহাট' },
          { id: 'kur_th_raumari', name: 'রৌমারী' },
          { id: 'kur_th_ulipur', name: 'উলিপুর' },
        ],
      },
      {
        id: 'lalmonirhat_dist',
        name: 'লালমনিরহাট',
        thanas: [
          { id: 'lal_th_aditmari', name: 'আদিতমারী' },
          { id: 'lal_th_hatibandha', name: 'হাতীবান্ধা' },
          { id: 'lal_th_kaliganj', name: 'কালীগঞ্জ' },
          { id: 'lal_th_lalmonirhat_sadar', name: 'লালমনিরহাট সদর' },
          { id: 'lal_th_patgram', name: 'পাটগ্রাম' },
        ],
      },
      {
        id: 'nilphamari_dist',
        name: 'নীলফামারী',
        thanas: [
          { id: 'nil_th_dimla', name: 'ডিমলা' },
          { id: 'nil_th_domar', name: 'ডোমার' },
          { id: 'nil_th_jalphaka', name: 'জলঢাকা' },
          { id: 'nil_th_kishoreganj', name: 'কিশোরগঞ্জ' },
          { id: 'nil_th_nilphamari_sadar', name: 'নীলফামারী সদর' },
          { id: 'nil_th_syedpur', name: 'সৈয়দপুর' },
        ],
      },
      {
        id: 'panchagarh_dist',
        name: 'পঞ্চগড়',
        thanas: [
          { id: 'pan_th_atwari', name: 'আটোয়ারী' },
          { id: 'pan_th_boda', name: 'বোদা' },
          { id: 'pan_th_debiganj', name: 'দেবীগঞ্জ' },
          { id: 'pan_th_panchagarh_sadar', name: 'পঞ্চগড় সদর' },
          { id: 'pan_th_tentulia', name: 'তেঁতুলিয়া' },
        ],
      },
      {
        id: 'rangpur_dist',
        name: 'রংপুর',
        thanas: [
          { id: 'rng_th_badarganj', name: 'বদরগঞ্জ' },
          { id: 'rng_th_gangachhara', name: 'গঙ্গাচড়া' },
          { id: 'rng_th_kaunia', name: 'কাউনিয়া' },
          { id: 'rng_th_rangpur_sadar', name: 'রংপুর সদর' },
          { id: 'rng_th_mithapukur', name: 'মিঠাপুকুর' },
          { id: 'rng_th_pirgachha', name: 'পীরগাছা' },
          { id: 'rng_th_pirganj', name: 'পীরগঞ্জ' },
          { id: 'rng_th_taraganj', name: 'তারাগঞ্জ' },
        ],
      },
      {
        id: 'thakurgaon_dist',
        name: 'ঠাকুরগাঁও',
        thanas: [
          { id: 'tha_th_baliadangi', name: 'বালিয়াডাঙ্গী' },
          { id: 'tha_th_haripur', name: 'হরিপুর' },
          { id: 'tha_th_pirganj', name: 'পীরগঞ্জ' },
          { id: 'tha_th_ranisankail', name: 'রাণীশংকৈল' },
          { id: 'tha_th_thakurgaon_sadar', name: 'ঠাকুরগাঁও সদর' },
        ],
      },
    ],
  },
  {
    id: 'sylhet',
    name: 'সিলেট',
    districts: [
      {
        id: 'habiganj_dist',
        name: 'হবিগঞ্জ',
        thanas: [
          { id: 'hab_th_ajmiriganj', name: 'আজমিরীগঞ্জ' },
          { id: 'hab_th_bahubal', name: 'বাহুবল' },
          { id: 'hab_th_baniachong', name: 'বানিয়াচং' },
          { id: 'hab_th_chunarughat', name: 'চুনারুঘাট' },
          { id: 'hab_th_habiganj_sadar', name: 'হবিগঞ্জ সদর' },
          { id: 'hab_th_lakhai', name: 'লাখাই' },
          { id: 'hab_th_madhabpur', name: 'মাধবপুর' },
          { id: 'hab_th_nabiganj', name: 'নবীগঞ্জ' },
          { id: 'hab_th_shayestaganj', name: 'শায়েস্তাগঞ্জ' },
        ],
      },
      {
        id: 'moulvibazar_dist',
        name: 'মৌলভীবাজার',
        thanas: [
          { id: 'mou_th_barlekha', name: 'বড়লেখা' },
          { id: 'mou_th_juri', name: 'জুড়ী' },
          { id: 'mou_th_kamalganj', name: 'কমলগঞ্জ' },
          { id: 'mou_th_kulaura', name: 'কুলাউড়া' },
          { id: 'mou_th_moulvibazar_sadar', name: 'মৌলভীবাজার সদর' },
          { id: 'mou_th_rajanagar', name: 'রাজনগর' },
          { id: 'mou_th_sreemangal', name: 'শ্রীমঙ্গল' },
        ],
      },
      {
        id: 'sunamganj_dist',
        name: 'সুনামগঞ্জ',
        thanas: [
          { id: 'sun_th_bishwamvarpur', name: 'বিশ্বম্ভরপুর' },
          { id: 'sun_th_chhatak', name: 'ছাতক' },
          { id: 'sun_th_derai', name: 'দিরাই' },
          { id: 'sun_th_dharmapasha', name: 'ধর্মপাশা' },
          { id: 'sun_th_dowarabazar', name: 'দোয়ারাবাজার' },
          { id: 'sun_th_jagannathpur', name: 'জগন্নাথপুর' },
          { id: 'sun_th_jamalganj', name: 'জামালগঞ্জ' },
          { id: 'sun_th_sullah', name: 'শাল্লা' },
          { id: 'sun_th_sunamganj_sadar', name: 'সুনামগঞ্জ সদর' },
          { id: 'sun_th_tahirpur', name: 'তাহিরপুর' },
          { id: 'sun_th_dakshin_sunamganj', name: 'দক্ষিণ সুনামগঞ্জ' },
        ],
      },
      {
        id: 'sylhet_dist',
        name: 'সিলেট',
        thanas: [
          { id: 'syl_th_balaganj', name: 'বালাগঞ্জ' },
          { id: 'syl_th_beanibazar', name: 'বিয়ানীবাজার' },
          { id: 'syl_th_bishwanath', name: 'বিশ্বনাথ' },
          { id: 'syl_th_companiganj', name: 'কোম্পানীগঞ্জ' },
          { id: 'syl_th_fencuganj', name: 'ফেঞ্চুগঞ্জ' },
          { id: 'syl_th_golapganj', name: 'গোলাপগঞ্জ' },
          { id: 'syl_th_gowainghat', name: 'গোয়াইনঘাট' },
          { id: 'syl_th_jaintiapur', name: 'জৈন্তাপুর' },
          { id: 'syl_th_kanaighat', name: 'কানাইঘাট' },
          { id: 'syl_th_sylhet_sadar', name: 'সিলেট সদর' },
          { id: 'syl_th_zakiganj', name: 'জকিগঞ্জ' },
          { id: 'syl_th_dakshin_surma', name: 'দক্ষিণ সুরমা' },
          { id: 'syl_th_osmani_nagar', name: 'ওসমানীনগর' },
        ],
      },
    ],
  },
];

    
