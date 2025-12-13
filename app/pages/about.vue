<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="応募方法" section-id="participationGuide" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>現在、下記に表示されている内容を募集中です（表示期間外は何も表示されません）。<br>詳細は各項目をご確認ください。</p>
        </div>
      </v-col>
    </v-row>
    <UtilPhase>
      <template v-for="k in ['PL1', 'PL2']" :key="k" v-slot:[k]>
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="PL募集要項" section-id="plRecruit" />
            <div class="mt-3 text-body d-flex flex-column ga-2">
              <div>
                <p class="text-subtitle-1"><strong>【募集日程】</strong></p>
                <p>2026年3月1日(日)〜2026年3月21日(土) 23:59</p>
                <p>応募結果連絡：2026年3月下旬<br><span class="text-body-2">※応募多数の場合、抽選とさせていただきます</span></p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【参加費】</strong></p>
                <p>一般：1,000円、学生：500円(要学生証提示)</p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【応募方法】</strong></p>
                <p>下記リンクから応募フォームを開き、必要事項を記入してください。</p>
                <div class="my-1">
                  <p>
                    <a
                      href="https://forms.gle/nU7mpR5DHnbA3Sna9"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-decoration-none font-weight-bold"
                      :style="{ color: primary }"
                    >
                      ［DAC東北 2026 PL応募フォーム］
                    </a>
                  </p>
                  <p class="text-body-2">※外部のページ(Googleフォーム)が開きます</p>
                </div>
                <p>応募が完了すると、応募時に入力いただいたアドレス宛に自動返信メールが送信されます。応募内容の確認はメールの本文にて行っていただけますので、そちらをご確認ください。</p>
                <p>24時間経ってもメールの返信がない場合、送信エラーの可能性があります。<br>不着の場合、お手数ですがメール・お問い合わせにてご連絡ください。</p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【キャンセルについて】</strong></p>
                <p>キャンセルの場合、下記メールアドレスにご連絡いただいた上で、必ずDiscordでDM・他PLの方にご連絡をお願いします。
                </p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【当日について】</strong></p>
                <p>交流推進のため、参加中はネックパスの着用をお願いします。</p>
                <p class="font-weight-bold">協力的な卓への参加ができない方はPL応募を控えるようにお願いいたします。<br />DAC東北において人間関係のトラブルや同類のトラブルが発生した場合、DM/GMまたはスタッフの権限において途中退席および今後の参加をお断りする場合があります。<br />予めご了承ください。</p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【連絡先メールアドレス】</strong></p>
                <p>DAC東北運営へのお問い合わせはXでのDMまたはメニューのお問い合わせフォーム、Discordまでお問い合わせください。</p>
                <p>DAC東北へメールでお問い合わせ頂く場合は<span class="font-weight-bold" :style="{ color: primary }">dac.tohoku.d20@gmail.com</span>までお問い合わせください。</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-for="k in ['GM1', 'GM2']" :key="k" v-slot:[k]>
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="DM/GM募集要項" section-id="dmRecruit" />
            <div class="mt-3 text-body d-flex flex-column ga-2">
              <div>
                <p class="text-subtitle-1"><strong>【募集日程】</strong></p>
                <p>2026年2月7日(土)〜2026年2月23日(月祝) 23:59まで</p>
                <p>応募結果連絡：2026年2月24日以降<br><span class="text-body-2">※応募多数の場合、抽選とさせていただきます</span></p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【参加費】</strong></p>
                <p>DM/GM参加：無料</p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【応募方法】</strong></p>
                <p>下記リンクから応募フォームを開き、必要事項を記入してください。</p>
                <div class="my-1">
                  <p>
                    <a
                      href="https://forms.gle/rxGszLAnsHeMkpri6"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-decoration-none font-weight-bold"
                      :style="{ color: primary }"
                    >
                      ［DAC東北 2026 DM/GM応募フォーム］
                    </a>
                  </p>
                  <p class="text-body-2">※外部のページ(Googleフォーム)が開きます</p>
                </div>
                <p>応募が完了すると、応募時に入力いただいたアドレス宛に自動返信メールが送信されます。応募内容の確認はメールの本文にて行っていただけますので、そちらをご確認ください。</p>
                <p>24時間経ってもメールの返信がない場合、送信エラーの可能性があります。<br>不着の場合、お手数ですがXでのDMまたはメール・お問い合わせにてご連絡ください。</p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【キャンセルについて】</strong></p>
                <p>キャンセルの場合、下記メールアドレスにご連絡いただいた上で、必ずDiscordで他PLの方にご連絡をお願いします。<br>また、可能であれば代わりのマスターの方をご紹介ください。
                </p>
              </div>
              <div>
                <p class="text-subtitle-1"><strong>【連絡先メールアドレス】</strong></p>
                <p>DAC東北運営へのお問い合わせはXでのDMまたはメニューのお問い合わせフォーム、Discordまでお問い合わせください。</p>
                <p>DAC東北へメールでお問い合わせ頂く場合は<span class="font-weight-bold" :style="{ color: primary }">dac.tohoku.d20@gmail.com</span>までお問い合わせください。</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
    </UtilPhase>
  </v-container>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '参加案内',
})

const primary = 'rgb(var(--v-theme-primary))'
</script>
