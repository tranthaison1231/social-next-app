'use client';
import Button from '@/components/Button';
import FormItem from '@/components/FormItem';
import { Tag } from '@/components/Tag';
import { useToggle } from '@/hooks/useToggle';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import BannerModal from './BannerModal';

const TAGS = ['Product', 'Marketing', 'Design', 'Engineering'];

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  date: z.date({
    required_error: 'Date is required',
  }),
  time: z.date({
    required_error: 'Time is required',
  }),
  privacy: z.string({
    required_error: 'Privacy is required',
  }),
  venue: z.string().min(1, 'Venue is required'),
  description: z.string().min(1, 'Description is required'),
  capacity: z.number().min(1, 'Max Capacity must to be greater than 0'),
  price: z.number().min(1, 'Max Capacity must to be greater than 0'),
  isManualApprove: z.boolean().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;


export default function Home() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: 'Untitle Event',
    }
  });
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

  const onFinish = async ({ date, time, ...values }: FormSchemaType) => {
    if (checkFail()) return;
    setLoading(true);
    const startAt = new Date(
      date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }) +  ' ' +
        time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
    );
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
        alert(data?.detail?.[0]?.msg);
      }
      alert('Social post created successfully');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Something went wrong: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BannerModal visible={isOpen} onClose={close} onClick={selectBanner} />
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="grid grid-cols-[1fr_1.2fr] gap-5">
          <div className="w-full">
            <FormItem field={errors.title}>
              <input
                className="bg-[#942F70] h-16 px-[12px] py-[4px] text-5xl font-bold text-white w-full box-border"
                {...register('title')}
              />
            </FormItem>
            <div className="grid mt-7 gap-6 grid-cols-2">
              <div className="flex gap-4 w-full">
                <Image src="/date.svg" alt="Date Picker" width={33} height={33} priority />
                <FormItem field={errors.date}>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <DatePicker
                        placeholderText="Select date"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        className="font-bold w-full placeholder:text-black h-9 px-3 outline-none rounded border-none box-border"
                      />
                    )}
                  />
                </FormItem>
              </div>
              <div className="flex gap-4 w-full">
                <Image src="/time.svg" alt="Time Picker" width={33} height={33} priority />
                <FormItem field={errors.time}>
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        placeholderText="Select Time"
                        onChange={(date) => field.onChange(date)}
                        className="font-bold w-full placeholder:text-black h-9 px-3 outline-none rounded border-none box-border"
                        dateFormat="h:mm aa"
                        timeCaption="Time"
                        showTimeSelect
                        showTimeSelectOnly
                      />
                    )}
                  />
                </FormItem>
              </div>
            </div>
            <div className="flex gap-4 items-center mt-7">
              <Image src="/address.svg" className="aspect-square" alt="Time Picker" width={33} height={33} priority />
              <FormItem field={errors.venue}>
                <input
                  placeholder="Venue"
                  className="font-bold text-sm placeholder:text-black h-9 px-3 outline-none rounded border-none w-full box-border"
                  {...register('venue')}
                />
              </FormItem>
            </div>
            <div className="grid mt-3 grid-cols-2 gap-9">
              <div className="flex gap-4 w-full">
                <Image src="/group-people.svg" alt="Time Picker" width={33} height={33} priority />
                <FormItem field={errors.capacity}>
                  <input
                    type="number"
                    placeholder="Max capacity"
                    min={0}
                    className="font-bold text-sm placeholder:text-black h-9 px-3 outline-none rounded border-none w-full box-border"
                    {...register('capacity', { valueAsNumber: true })}
                  />
                </FormItem>
              </div>
              <div className="flex gap-4 w-full">
                <Image src="/money.svg" alt="Time Picker" width={33} height={33} priority />
                <FormItem field={errors.price}>
                  <input
                    type="number"
                    placeholder="Cost per person"
                    min={0}
                    className="font-bold text-sm placeholder:text-black h-9 px-3 outline-none rounded border-none w-full box-border"
                    {...register('price', { valueAsNumber: true })}
                  />
                </FormItem>
              </div>
            </div>
          </div>
          <div onClick={open} className="cursor-pointer w-full h-[445px] relative">
            {banner ? (
              <Image fill src={banner} alt="Banner" priority />
            ) : (
              <div className="bg-[#f2f2f21a] w-full h-full flex items-center justify-center border border-dashed border-red-50 rounded-bl-[64px] rounded-tr-[64px] ">
                <div className="flex items-center">
                  <Image
                    src="/export-image.svg"
                    alt="Add a banner"
                    width={24}
                    height={24}
                    className="aspect-square"
                    priority
                  />
                  <p className="pl-4 text-[#14597A] text-xl"> Add a Banner </p>
                </div>
              </div>
            )}
            {isFail && !banner && <p className="text-red-500">Please select banner</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 mt-5">
          <div className="w-full">
            <FormItem field={errors.description} label="Description">
              <textarea
                rows={6}
                className="w-full p-3 rounded-lg box-border border-none"
                placeholder="Description of your event..."
                {...register('description')}
              />
            </FormItem>
            <div className="rounded-3xl px-11 py-8 mt-8 bg-white w-full box-border">
              <p className="m-0 bg-[#F3F452] w-fit p-3 mb-6 text-[#942F70] font-bold text-3xl"> Settings </p>
              <label>
                <input type="checkbox" {...register('isManualApprove')} />I want to approve attendess
              </label>
              <p className="mt-[26px] text-base text-gray-700 font-bold"> Privacy </p>
              <FormItem field={errors.privacy}>
                <div className="flex gap-[32px] mt-2">
                  {['Public', 'Curated Audience', 'Community Only'].map((item) => (
                    <label key={item}>
                      <input {...register('privacy')} type="radio" value={item} />
                      {item}
                    </label>
                  ))}
                </div>
              </FormItem>
              <p className="text-gray-700 mt-7 text-base font-bold"> Tag your social </p>
              <p className="text-gray-600">Pick tags for our curation engine to work its magin</p>
              <div className="mt-6 gap-2 flex">
                {selectedTags.map((tag) => (
                  <Tag onClose={closeTag(tag)} key={tag}>
                    {tag}
                  </Tag>
                ))}
                {isFail && !selectedTags.length && <p className="text-red-500">Please select tag</p>}
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
            <Button loading={loading} type="submit" className="mt-8">
              CREATE SOCIAL
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
