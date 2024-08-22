<template>
    <div v-if="langStore.currentLocale.value === 'ru'">
        <p class="mb-5">Exbmba – твоя путевка в будущее!</p>
        <p class="mb-5">
            Готовишься к поступлению в вуз? Exbmba – это твоя надежная платформа
            для подготовки к экзаменам. У нас ты найдешь тысячи тестовых заданий
            по самым разным предметам. Решай тесты онлайн, отслеживай свой
            прогресс и уверенно иди к своей цели!Exbmba: Подготовься к экзаменам
            с нами!
        </p>

        <p class="mb-5">
            Хочешь поступить в престижный вуз? Exbmba – это твоя персональная
            онлайн-школа подготовки к экзаменам. На нашей платформе ты найдешь:
        </p>

        <p class="mb-5">
            Огромный выбор тестовых заданий: Математика, физика, химия,
            биология, обществознание – все предметы, необходимые для успешной
            сдачи экзаменов.
        </p>

        <p class="mb-5">
            Разнообразные форматы заданий: Тесты с выбором ответа, задачи на
            соответствие, открытые вопросы – готовься к любым форматам экзамена.
        </p>

        <p class="mb-5">
            Подробные решения: Не можешь решить задачу? Подробные решения
            помогут тебе разобраться в любом вопросе.
        </p>

        <p class="mb-5">
            Удобный интерфейс: Наша платформа интуитивно понятна и проста в
            использовании.
        </p>

        <p class="mb-5">
            Статистика прогресса: Отслеживай свои результаты и видь, как ты
            растешь!
        </p>

        <p class="mb-5">
            Exbmba – это не просто тесты, это твоя гарантия успеха!
        </p>

        <p class="mb-5">Почему Exbmba?</p>

        <p class="mb-5">
            Эффективная подготовка: Решай тысячи тестовых заданий и оттачивай
            свои навыки.
        </p>

        <p class="mb-5">
            Индивидуальный подход: Адаптируй процесс обучения под свои нужды.
        </p>

        <p class="mb-5">
            Экономия времени и денег: Забудь о дорогих репетиторах – все
            необходимое для подготовки ты найдешь на Exbmba.
        </p>
        <p class="mb-5">
            Гарантия качества: Наши задания разработаны опытными педагогами.
        </p>

        <p class="mb-5">Exbmba – твой надежный помощник на пути к знаниям!</p>
    </div>
    <div v-else-if="langStore.currentLocale.value === 'uz-Latn'">
        <p class="mb-5">Exbmba – sizning kelajagingizga yo‘l!</p>
        <p class="mb-5">
            Oliygohga kirish imtihonlariga tayyorgarlik ko‘rayapsizmi? Exbmba –
            bu siz uchun eng ishonchli onlayn tayyorgarlik platformasi. Bizda
            turli fanlar bo‘yicha minglab test savollari mavjud. Onlayn
            testlarni yechib, o‘zingizning progressingizni kuzatib boring va
            maqsadingizga ishonch bilan yeting! Exbmba: Imtihonlarga
            tayyorgarlikni biz bilan boshla!
        </p>

        <p class="mb-5">
            Prestijli oliygohga kirishni xohlaysizmi? Exbmba – bu siz uchun
            shaxsiy onlayn tayyorgarlik maktabi. Bizning platform amizda
            quyidagilarni topasiz:
        </p>

        <p class="mb-5">
            Minglab test savollari: Matematika, fizika, kimyo, biologiya,
            ijtimoiy fanlar – imtihonlarni muvaffaqiyatli topshirish uchun zarur
            bo‘lgan barcha fanlar.
        </p>

        <p class="mb-5">
            Turli xil savol formatlari: Tanlovli javoblar, moslashtirish
            vazifalari, ochiq savolar – har qanday imtihon formatiga
            tayyorlaning.
        </p>

        <p class="mb-5">
            Batafsil yechimlar: Vazifani yecha olmadingizmi? Batafsil yechimlar
            har qanday savolda sizga yordam beradi.
        </p>

        <p class="mb-5">
            Qulay interfeys: Bizning platform amiz intuitiv va foydalanish uchun
            oson.
        </p>

        <p class="mb-5">
            Progress statistikasi: Natijalaringizni kuzatib boring va qanday
            o‘sib borayotganingizni ko‘ring!
        </p>

        <p class="mb-5">
            Exbmba – bu shunchaki testlar emas, balki muvaffaqiyatingizning
            kafolati!
        </p>

        <p class="mb-5">Nima uchun Exbmba?</p>

        <p class="mb-5">
            Zo‘r tayyorgarlik: Minglab test savolarini yechib, bilimingizni
            mustahkamlang.
        </p>

        <p class="mb-5">
            Individual yondashuv: O‘qish jarayonini o‘zingizga moslashtiring.
        </p>

        <p class="mb-5">
            Vaqt va pulni tejang: Qimmatbaho repetitorlarni unuting – barcha
            kerakli narsalarni Exbmbada topasiz
        </p>
        <p class="mb-5">
            Sifat kafolati: Bizning vazifalarimiz tajribali pedagoglar tomonidan
            ishlab chiqilgan
        </p>

        <p class="mb-5">
            Exbmba – bu bilimga bo‘lgan yo‘lingizda sizning ishonchli
            yordamchingiz!
        </p>
    </div>
    <div v-else>
        <p class="mb-5">Exbmba - siziń keleshegińizge jol!</p>
        <p class="mb-5">
            Joqarı oqıw ornına kiriw imtixanlarına tayarlanıp atırsız ba? Exbmba
            - bul siz ushın eń isenimli onlayn tayarlıq platforması. Bizde hár
            qıylı pánler boyınsha mıńlaǵan test sorawları bar. Onlayn testlerdi
            sheship, ózińizdiń rawajlanıwıńızdı baqlap barıń hám maqsetinizge
            isenim menen erisiń! Exbmba: Imtixanlarǵa tayarlanıwdı biz benen
            basla!
        </p>

        <p class="mb-5">
            Prestijli joqarı oqıw ornına kiriwdi qáleysiz be? Exbmba - bul siz
            ushın jeke onlayn tayarlıq mektebi. Biziń platformamızda
            tómendegilerdi taba alasız:
        </p>
        <p class="mb-5">
            Mıńlap test sorawları: Matematika, fizika, ximiya, biologiya,
            sociallıq pánler - imtixanlardı tabıslı tapsırıw ushın zárúr bolgan
            barlıq pánler.
        </p>

        <p class="mb-5">
            Hár túrli soraw formatları: Tańlap alıwshı juwaplar, sáykeslendiriw
            tapsırmaları, ashıq sorawlar - hár qanday imtixan formatına
            tayarlanıń.
        </p>

        <p class="mb-5">
            Tolıq sheshimler: Wazıypanı sheshe almadınız ba? Tolıq túsindirmeli
            sheshimler hár qanday sorawda sizge járdem beredi.
        </p>

        <p class="mb-5">
            Qolaylı interfeys: Biziń platformamız intuitiv hám paydalanıw ushin
            ansat
        </p>
        <p class="mb-5">
            Progress statistikası: Nátiyjelerińizdi baqlań hám qalay ósip
            baratırganınızdı kóriń!
        </p>

        <p class="mb-5">
            Exbmba - bul tek ǵana testler emes, al tabısıńızdıń kepili!
        </p>

        <p class="mb-5">Ne ushın Exbmba?</p>

        <p class="mb-5">
            Kúshli tayarlıq: Mıńlap test sorawların sheship, biliminizdi
            bekkemleń.
        </p>

        <p class="mb-5">
            Individual qatnas: Oqiw procesin ózińizge beyimlestiriń.
        </p>

        <p class="mb-5">
            Waqıt hám puldı únemleń: Qımbat bahalı repetitorlardı umıtıń -
            barlıq kerekli zatlardı Exbmba'da tabasız.
        </p>
        <p class="mb-5">
            Sapa kepilligi: Biziń wazıypalarımız tájiriybeli pedagoglar
            tárepinen islep shıǵılǵan.
        </p>

        <p class="mb-5">
            Exbmba - bul bilimge bolǵan jolınızda siziń isenimli járdemshińiz!
        </p>
    </div>
</template>

<script setup>
import { useLangStore } from 'src/stores/lang.store'

const langStore = useLangStore()
</script>
