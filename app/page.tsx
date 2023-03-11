'use client';
import { Spin } from '@/components/Spin';
import { Tag } from '@/components/Tag';
import { theme } from '@/configs/theme';
import { useToggle } from '@/hooks/useToggle';
import {
  Checkbox,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio
} from 'antd';
import { RuleObject } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import Image from 'next/image';
import { useState } from 'react';
import BannerModal from './BannerModal';

const TAGS = ['Product', 'Marketing', 'Design', 'Engineering'];

const validateNumber = (_rule: RuleObject, value: number, callback: (message?: string) => void) => {
  if (value === undefined) callback('Please enter a number');
  if (value <= 0) {
    callback('Number must be greater than 0');
  } else {
    callback();
  }
};

export default function Home() {
  const form = Form.useForm()[0];
  const [isOpen, open, close] = useToggle(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const selectBanner = (banner: string) => {
    setBanner(banner);
    close();
  };

  const selectTag = (tag: string) => () => {
    setSelectedTags((tags) => [...tags, tag]);
  };

  const closeTag = (tag: string) => () => {
    setSelectedTags((tags) => tags.filter((t) => t !== tag));
  };

  const checkFail = () => {
    if (selectedTags.length === 0 || banner === null) {
      setIsFail(true);
      return true;
    }
    return false;
  };

  const onFinish = async ({ date, time, ...values }: Store) => {
    if (checkFail()) return;
    setLoading(true);
    const startAt = new Date(date.format('MM/DD/YYYY') + ' ' + time.format('HH:mm:ss'));
    try {
      const response = await fetch('/api/social', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          startAt,
          tags: selectedTags,
          banner,
        }),
      });
      const data = await response.json();
      if (data?.detail?.[0].type === 'value_error.missing') {
        notification.error({ message: data?.detail?.[0]?.msg });
      }
      notification.success({ message: 'Social post created successfully' });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({ message: `Something went wrong: ${error.message}` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <BannerModal visible={isOpen} onClose={close} onClick={selectBanner} />
      <Form
        onFinish={onFinish}
        form={form}
        onFinishFailed={checkFail}
        initialValues={{
          title: 'Untitle Event',
        }}
      >
        <div className="grid grid-cols-[1fr_1.2fr] gap-5">
          <div className="w-full">
            <Form.Item name="title" rules={[{ required: true }]}>
              <input className="bg-[#942F70] h-16 px-[12px] py-[4px] text-5xl font-bold text-white w-full box-border" />
            </Form.Item>
            <div className="grid mt-7 gap-6 grid-cols-2">
              <div className="flex gap-4 w-full">
                <Image src="/date.svg" alt="Date Picker" width={33} height={33} priority />
                <Form.Item name="date" rules={[{ required: true }]} className="w-full mb-0">
                  <DatePicker placeholder="Date" suffixIcon={false} size="large" className="w-full font-bold" />
                </Form.Item>
              </div>
              <div className="flex gap-4 w-full">
                <Image src="/time.svg" alt="Time Picker" width={33} height={33} priority />
                <Form.Item name="time" rules={[{ required: true }]} className="w-full mb-0">
                  <DatePicker.TimePicker
                    placeholder="Time"
                    suffixIcon={false}
                    size="large"
                    className="font-bold w-full"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-4 items-center mt-7">
              <Image src="/address.svg" alt="Time Picker" width={33} height={33} priority />
              <Form.Item name="venue" rules={[{ required: true }]} className="w-full mb-0">
                <Input size="large" placeholder="Venue" className="font-bold" />
              </Form.Item>
            </div>
            <div className="grid mt-3 grid-cols-2 gap-9">
              <div className="flex gap-4 w-full">
                <Image src="/group-people.svg" alt="Time Picker" width={33} height={33} priority />
                <Form.Item name="capacity" rules={[{ required: true, validator: validateNumber }]} className="w-full">
                  <InputNumber size="large" placeholder="Max capacity" min={0} className="font-bold w-full" />
                </Form.Item>
              </div>
              <div className="flex gap-4 w-full">
                <Image src="/money.svg" alt="Time Picker" width={33} height={33} priority />
                <Form.Item name="price" className="w-full" rules={[{ validator: validateNumber }]}>
                  <InputNumber size="large" placeholder="Cost per person" min={0} className="font-bold w-full" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div onClick={open} className="cursor-pointer w-full h-[445px] relative">
            {banner ? (
              <Image fill src={banner} alt="Banner" priority />
            ) : (
              <div className="bg-[#f2f2f21a] w-full h-full flex items-center justify-center border border-dashed border-red-50 rounded-bl-[64px] rounded-tr-[64px] ">
                <p className="flex text-[#14597A] text-xl items-center">
                  <Image src="/export-image.svg" alt="Add a banner" width={24} height={21.75} priority />
                  <span className="pl-4"> Add a Banner </span>
                </p>
              </div>
            )}
            <Form.Item>
              {isFail && !banner && <p className="ant-form-item-explain-error">Please select banner</p>}
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-5">
          <div className="w-full">
            <label htmlFor="description" className="block text-sm text-[#333333]">
              Description
            </label>
            <Form.Item name="description" className="w-full" rules={[{ required: true }]}>
              <textarea
                rows={6}
                id="description"
                className="w-full p-3 rounded-lg box-border border-none"
                placeholder="Description of your event..."
              />
            </Form.Item>
            <div className="rounded-3xl px-11 py-8 mt-8 bg-white w-full box-border">
              <p className="m-0 bg-[#F3F452] w-fit p-3 text-[#942F70] font-bold text-3xl"> Settings </p>
              <Form.Item name="isManualApprove" valuePropName="checked" className="w-full">
                <Checkbox className="mt-6"> I want to approve attendess</Checkbox>
              </Form.Item>
              <p className="mt-[26px] text-base text-gray-700 font-bold"> Privacy </p>
              <Form.Item name="privacy" className="w-full" rules={[{ required: true }]}>
                <Radio.Group className="flex gap-[32px] mt-2">
                  <Radio value="Public">Public</Radio>
                  <Radio value="Curated Audience">Curated Audience</Radio>
                  <Radio value="Community Only">Community Only</Radio>
                </Radio.Group>
              </Form.Item>
              <p className="text-gray-700 mt-7 text-base font-bold"> Tag your social </p>
              <p className="text-gray-600">Pick tags for our curation engine to work its magin</p>
              <div className="mt-6 gap-2 flex">
                {selectedTags.map((tag) => (
                  <Tag onClose={closeTag(tag)} key={tag}>
                    {tag}
                  </Tag>
                ))}
                <Form.Item>
                  {isFail && !selectedTags.length && <p className="ant-form-item-explain-error">Please select tag</p>}
                </Form.Item>
              </div>
              <div className="mt-6 gap-2 flex">
                {TAGS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
                  <div
                    key={tag}
                    onClick={selectTag(tag)}
                    className="cursor-pointer px-2 py-1 bg-[#F2F4F7] w-fit rounded-2xl"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 bg-[#FEF452] text-[#942F70] text-xl cursor-pointer w-full rounded-lg h-12 border-none shadow-lg active:scale-99"
            >
              {loading && <Spin />}
              CREATE SOCIAL
            </button>
          </div>
        </div>
      </Form>
    </ConfigProvider>
  );
}
