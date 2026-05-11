import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@/components/foundation/Input/TextInput';
import { Button } from '@/components/foundation/Button/Button';
import { listingSchema, type ListingFormData } from '@/utils/validators';
import { listingService } from '@/services/api/listingService';
import { PROPERTY_TYPES, TRANSACTION_TYPES, FINISH_TYPES, EGYPTIAN_CITIES, AMENITIES_LIST } from '@/utils/constants';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { ArrowRight, Save, Upload, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ListingFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const listingQuery = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getById(id!),
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEdit ? listingService.update(id!, data) : listingService.create(data),
    onSuccess: () => {
      toast.success(isEdit ? 'تم تحديث العقار بنجاح' : 'تم إضافة العقار بنجاح');
      navigate(ROUTES.dashboard.listings);
    },
    onError: () => {
      toast.error('حدث خطأ، حاول مرة أخرى');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    // resolver: zodResolver(listingSchema),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      price: Number(data.price),
      area: Number(data.area),
      rooms: Number(data.rooms) || 0,
      bathrooms: Number(data.bathrooms) || 0,
      amenities: selectedAmenities,
      images,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isEdit ? 'تعديل عقار' : 'إضافة عقار جديد'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEdit ? 'تعديل بيانات العقار' : 'أدخل بيانات العقار الجديد'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* القسم الأساسي */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">1</span>
            المعلومات الأساسية
          </h3>

          <TextInput
            label="عنوان العقار"
            placeholder="مثال: شقة فاخرة في المعادي"
            error={errors.title?.message as string}
            {...register('title')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                نوع العقار <span className="text-red-500">*</span>
              </label>
              <select className="input" {...register('property_type')}>
                <option value="">اختر النوع</option>
                {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                نوع المعاملة <span className="text-red-500">*</span>
              </label>
              <select className="input" {...register('transaction_type')}>
                <option value="">اختر النوع</option>
                {Object.entries(TRANSACTION_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              الوصف
            </label>
            <textarea
              rows={5}
              className="input"
              placeholder="وصف تفصيلي للعقار..."
              {...register('description')}
            />
          </div>
        </div>

        {/* المواصفات */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">2</span>
            المواصفات
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <TextInput label="السعر (ج.م)" type="number" placeholder="500000" {...register('price')} />
            <TextInput label="المساحة (م²)" type="number" placeholder="120" {...register('area')} />
            <TextInput label="عدد الغرف" type="number" placeholder="3" {...register('rooms')} />
            <TextInput label="عدد الحمامات" type="number" placeholder="2" {...register('bathrooms')} />
            <TextInput label="الطابق" type="number" placeholder="2" {...register('floor')} />
            <TextInput label="عمر المبنى" type="number" placeholder="5" {...register('building_age')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">نوع التشطيب</label>
              <select className="input" {...register('finish_type')}>
                <option value="">اختر النوع</option>
                {Object.entries(FINISH_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <TextInput label="الاتجاه" placeholder="شمالي" {...register('direction')} />
          </div>
        </div>

        {/* الموقع */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">3</span>
            الموقع
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                المدينة <span className="text-red-500">*</span>
              </label>
              <select className="input" {...register('city')}>
                <option value="">اختر المدينة</option>
                {EGYPTIAN_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <TextInput label="الحي" placeholder="المعادي" {...register('district')} />
            <TextInput label="الشارع (اختياري)" placeholder="شارع 9" {...register('street')} />
          </div>
        </div>

        {/* المميزات */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">4</span>
            المميزات
          </h3>

          <div className="flex flex-wrap gap-2">
            {AMENITIES_LIST.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  selectedAmenities.includes(amenity)
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                )}
              >
                {selectedAmenities.includes(amenity) ? '✓' : '+'} {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* الصور */}
        <div className="card p-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-sm font-bold">5</span>
            الصور والوسائط
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={preview} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 end-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {imagePreviews.length < 10 && (
              <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-400">رفع صورة</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={mutation.isPending}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEdit ? 'حفظ التعديلات' : 'نشر العقار'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate(-1)}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
}
