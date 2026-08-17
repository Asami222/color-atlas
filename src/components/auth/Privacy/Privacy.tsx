//import { createMetadata } from "@/lib/metadata";
import { DocumentSection, Text, List, Heading } from "@/components/ui/Document"
/*
export const metadata = createMetadata({
    title: "利用規約",
    description: "利用規約についての概要ページです",
    path: "/terms",
});
*/
export function Privacy() {
    return (
          <article className="mx-auto max-w-4xl space-y-8 px-6 py-12">
            <Heading level={1}>プライバシーポリシー</Heading>
            <Text pattern={2}>最終更新日：2026年6月29日</Text>
            <DocumentSection title="第1条（目的）">
              <Text>本規約は、Color 本プライバシーポリシーは、Color Atlas（以下「本サービス」といいます。）が、利用者の個人情報の取扱いについて定めるものです。本サービスは、カメラで撮った写真から色彩地図帳を作成するサービスであり、デザイナーをはじめとする多くの皆様にご利用いただくことを想定しています。</Text>
            </DocumentSection>
            <DocumentSection title="第2条（個人情報の取得）">
                <List>
                  <li>本サービスは、利用者が本サービスを利用するにあたり、以下の個人情報を取得する場合があります。
                  <List>
                    <li>カメラで撮影された写真データ（これらに含まれる個人情報を含む）</li>
                    <li>その他、利用者が本サービスを通じて提供することを選択した情報</li>
                  </List>
                  </li>
                  <li>本サービスは、利用者の同意なく、個人情報の利用目的を変更することはありません。</li> 
                </List>
            </DocumentSection>
            <DocumentSection title="第3条（個人情報の利用目的）">
              <Text>本サービスは、取得した個人情報を以下の目的で利用します。</Text>
              <List>
                <li>色彩地図帳の作成および提供のため</li>
                <li>本サービスの機能改善および新機能開発のため</li>
                <li>利用者からの問い合わせへの対応のため</li>
                <li>その他、上記利用目的に付随する目的のため</li>
              </List>
            </DocumentSection>
            <DocumentSection title="第4条（個人情報の第三者提供）">
              <List>
                <li>本サービスは、法令に基づく場合または利用者の同意を得た場合を除き、個人情報を第三者に提供することはありません。</li>
                <li>ただし、本サービスの運営に必要な範囲で、個人情報の取扱いの全部または一部を委託する場合があります。この場合、委託先に対して適切な監督を行います。</li>              </List>
            </DocumentSection>
            <DocumentSection title="第5条（個人情報の管理）">
              <List>
                <li>本サービスは、個人情報の漏洩、滅失、毀損等を防止するため、必要かつ適切な安全管理措置を講じます。</li>
                <li>本サービスは、個人情報の取扱いに関し、従業者に対して適切な監督を行います。</li>
              </List>
            </DocumentSection>
            <DocumentSection title="第6条（個人情報の開示、訂正、削除等）">
                <List>
                  <li>利用者は、本サービスに対して、自己の個人情報の開示、訂正、追加、削除等を求めることができます。</li>
                  <li>本サービスは、利用者の請求に基づき、個人情報の開示等を行った場合、遅滞なくこれを行います。ただし、開示等を行うことにより、本サービスまたは第三者の権利利益を害するおそれがある場合、または法令に違反する場合は、この限りではありません。</li>
                </List>
            </DocumentSection>
            <DocumentSection title="第7条（Cookie（クッキー）の使用）">
                <List>
                    <li>本サービスは、利用者の利便性向上、利用状況の把握、広告配信等の目的で、Cookieを使用する場合があります。</li>
                    <li>Cookieは、利用者のブラウザを通じて、利用者のコンピュータに保存されますが、個人を特定できる情報は含まれません。</li>
                    <li>利用者は、ブラウザの設定により、Cookieの受諾を拒否することができます。ただし、その場合、本サービスの一部の機能が利用できなくなる可能性があります。</li>
                </List>
            </DocumentSection>
            <DocumentSection title="第8条（本プライバシーポリシーの変更）">
                <List>
                    <li>本サービスは、個人情報保護法その他の法令の改正、または本サービスのサービス内容の変更等に伴い、本プライバシーポリシーを随時変更することがあります。</li>
                    <li>変更後のプライバシーポリシーは、本サービス上に掲示した時点から効力を生じるものとします。</li>                </List>
            </DocumentSection>
            <DocumentSection title="第9条（お問い合わせ窓口）">
                <Text>本プライバシーポリシーに関するお問い合わせは、以下の窓口までご連絡ください。<br/>
                 email: asami2.works@gmail.com
                </Text>
            </DocumentSection>
            <Text pattern={2}>以上</Text>
          </article>
    )
}