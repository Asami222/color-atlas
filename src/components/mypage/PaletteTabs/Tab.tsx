import * as Tabs from "@radix-ui/react-tabs";

export function TailwindTabs() {
  return (
    <Tabs.Root defaultValue="tab1" className="flex flex-col w-[400px] shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* タブのリスト部分 */}
      <Tabs.List className="flex border-b border-gray-200 bg-gray-50" aria-label="アカウント管理">
        <Tabs.Trigger
          value="tab1"
          className="flex-1 px-5 py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
        >
          アカウント
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tab2"
          className="flex-1 px-5 py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
        >
          パスワード
        </Tabs.Trigger>
      </Tabs.List>

      {/* タブのコンテンツ部分 */}
      <Tabs.Content
        value="tab1"
        className="p-5 bg-white text-gray-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <p className="text-sm">アカウント情報の編集画面です。</p>
      </Tabs.Content>
      <Tabs.Content
        value="tab2"
        className="p-5 bg-white text-gray-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <p className="text-sm">パスワードの変更画面です。</p>
      </Tabs.Content>
    </Tabs.Root>
  );
}
