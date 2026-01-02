import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const AmcSchema = z.object({
    amcCode: z.string().min(1, 'AMC Code is required'),
    name: z.string().min(1, 'AMC Name is required'),
    shortName: z.string().optional(),
    logo: z.any()
        .refine((files) => files?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true, "Only .jpg, .jpeg, .png and .webp formats are supported.")
        .refine((files) => files?.length == 1 ? files[0]?.size <= MAX_FILE_SIZE : true, `Max file size is 5MB.`)
        .optional(),
    about: z.string().optional(),
    inceptionDate: z.string().optional(),
    sebiRegistrationNo: z.string().optional(),
    commonInvestmentPhilosophy: z.string().optional(),
    noOfStrategies: z.coerce.number().optional(),
    investmentTeam: z.string().optional(),
    investorLoginUrl: z.string().url().optional().or(z.literal('')),
    address: z.string().optional(),
    websiteUrl: z.string().url().optional().or(z.literal('')),
    twitterUrl: z.string().url().optional().or(z.literal('')),
    facebookUrl: z.string().url().optional().or(z.literal('')),
    linkedinUrl: z.string().url().optional().or(z.literal('')),
    youtubeUrl: z.string().url().optional().or(z.literal('')),
    creative: z.any()
        .refine((files) => files?.length == 1 ? files[0]?.size <= MAX_FILE_SIZE : true, `Max file size is 5MB.`)
        .optional(),
    googleMapLink: z.string().url().optional().or(z.literal('')),
    restrictDisplay: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    priorityOrder: z.coerce.number().optional(),
    filesToRemove: z.array(z.string()).optional(),
});

export type AmcSchemaType = z.infer<typeof AmcSchema>;